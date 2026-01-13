import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { ScreenshotsProofValues } from '@/lib/validators/listing-schemas';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import {
  Image,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
} from '@imagekit/next';
import {
  ImageIcon,
  MousePointerClickIcon,
  UploadCloudIcon,
} from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

type FetchResponse = {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
};

export default function Step4Form() {
  return (
    <FieldSet>
      <FieldGroup>
        <UploadExample />
      </FieldGroup>
    </FieldSet>
  );
}

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
function UploadExample() {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);

  const [uploadedResponse, setUploadedResponse] = useState<UploadResponse>();
  const [values, setValues] = useState<FetchResponse>();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<
    | ImageKitAbortError
    | ImageKitInvalidRequestError
    | ImageKitUploadNetworkError
    | ImageKitServerError
    | Error
  >();

  // State and transition for managing pending state during upload
  const [isAuthPending, startAuthTransition] = useTransition();
  const [isUploadPending, startUploadTransition] = useTransition();

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useFormContext<ScreenshotsProofValues>();

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  function authenticator() {
    startAuthTransition(async () => {
      try {
        // Perform the request to the upload authentication endpoint.
        const response = await fetch('/api/upload-auth');
        if (!response.ok) {
          // If the server response is not successful, extract the error text for debugging.
          const errorText = await response.text();
          toast.error(
            `Request failed with status ${response.status}: ${errorText}`
          );
          return undefined;
        }

        // Parse and destructure the response JSON for upload credentials.
        const data = (await response.json()) as FetchResponse;
        setValues(data);
      } catch (error) {
        // Log the original error for debugging before rethrowing a new error.
        console.error('Authentication error:', error);
        toast.error('Authentication request failed');
        throw new Error('Authentication request failed');
      }
    });
  }

  function handleUpload() {
    startUploadTransition(async () => {
      // Access the file input element using the ref
      const fileInput = fileInputRef.current;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        toast.info('Please select a file to upload');
        return;
      }

      // Extract the first file from the file input
      const file = fileInput.files[0];

      // Retrieve authentication parameters for the upload.
      authenticator();
      if (!values) {
        toast.error('Upload authentication failed. Please try again.');
        return;
      }
      const { signature, expire, token, publicKey } = values;

      // Call the ImageKit SDK upload function with the required parameters and callbacks.
      try {
        const uploadResponse = await upload({
          // Authentication parameters
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name, // Optionally set a custom file name

          // Progress callback to update upload progress state
          onProgress: (event) => {
            setProgress((event.loaded / event.total) * 100);
          },
          // Abort signal to allow cancellation of the upload if needed.
          abortSignal: abortController.signal,
        });
        // console.log('Upload response:', uploadResponse);
        setUploadedResponse(uploadResponse);
        if (!uploadResponse.url || !uploadResponse.thumbnailUrl) {
          toast.error('Upload failed: Missing URL in response');
          return;
        }
        form.setValue('images', [
          uploadResponse.url,
          uploadResponse.thumbnailUrl,
        ]);
        toast.success('🎉🎉🎉', { description: 'File uploaded successfully' });
      } catch (error) {
        // Handle specific error types provided by the ImageKit SDK.
        if (error instanceof ImageKitAbortError) {
          setError(error);
          setIsError(true);
          toast.error('Upload aborted:', { description: error.message });
        } else if (error instanceof ImageKitInvalidRequestError) {
          setError(error);
          setIsError(true);
          toast.error('Invalid request:', { description: error.message });
        } else if (error instanceof ImageKitUploadNetworkError) {
          setError(error);
          setIsError(true);
          toast.error('Network error:', { description: error.message });
        } else if (error instanceof ImageKitServerError) {
          setError(error);
          setIsError(true);
          toast.error('Server error:', { description: error.message });
        } else {
          // Handle any other errors that may occur.
          console.error('Upload error:', error);
          setError(error as Error);
          setIsError(true);
          toast.error('An unexpected error occurred during upload.');
        }
      }
    });
  }

  return (
    <Field
      data-invalid={isError}
      aria-invalid={isError}
      className={
        'border-dashed border-2 rounded-lg p-4 space-y-6 flex items-center flex-col'
      }>
      {/* File input element using React ref */}
      <Input
        type='file'
        id='image-upload'
        className={'hidden'}
        ref={fileInputRef}
      />

      {uploadedResponse ? (
        <div className={'size-36 p-2 rounded-full bg-accent'}>
          <Image
            urlEndpoint={uploadedResponse.url}
            src={uploadedResponse.url!}
            width={500}
            height={500}
            alt='Picture of the author'
            transformation={[{ width: 500, height: 500 }]}
            className='rounded-full'
          />
        </div>
      ) : (
        <div className={'size-12 p-2 rounded-full bg-accent'}>
          <ImageIcon className='size-full' />
        </div>
      )}

      <FieldLabel htmlFor='image-upload'>
        <span className={'inline-flex items-center gap-2'}>
          Select an image to upload
          <MousePointerClickIcon className={'size-4'} />
        </span>
        {/* {isError ? (
          <FieldError errors={[fieldState.error]} />
        ) : (
          <FieldDescription>
            Choose a unique title for your listing.
          </FieldDescription>
        )} */}
        <FieldDescription>
          Supported formats: JPG, PNG, GIF. Max size: 5MB.
        </FieldDescription>
      </FieldLabel>
      {/* Button to trigger the upload process */}
      <Button
        type='button'
        onClick={handleUpload}
        disabled={isAuthPending || isUploadPending}>
        {isAuthPending || isUploadPending ? (
          <span className={'inline-flex items-center gap-2'}>
            Uploading...
            <Spinner className={'size-4'} />
          </span>
        ) : (
          <span className={'inline-flex items-center gap-2'}>
            Upload File
            <UploadCloudIcon className='size-4' />
          </span>
        )}
      </Button>
      {/* Display the current upload progress */}
      <Progress value={progress} className='w-full mt-2' />
    </Field>
  );
}
