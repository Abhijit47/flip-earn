'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { listingSchema, ListingValues } from '@/lib/validators/listing-schemas';
// import { DevTool } from '@hookform/devtools';
import { useCreateListing } from '@/features/listing/hooks/use-listings';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  ListChecksIcon,
} from 'lucide-react';
import { useState, useTransition } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { toast } from 'sonner';
import Step1Form from './step-1-form';
import Step2Form from './step-2-form';
import Step3Form from './step-3-form';
import Step4Form from './step-4-form';

export default function ListingForm() {
  const [step, setStep] = useState(1);

  const [isPending, startTransition] = useTransition();

  const form = useForm<ListingValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: 'Language Tutor Account',
      platform: 'discord',
      username: '@username123',
      niche: 'tech',

      followersCount: 10000,
      engagementRate: 46, // TODO Make changes to float
      monthlyViews: 50000,
      country: 'india',
      audienceAgeRange: '18-24',
      isVerified: true,
      isMonetized: false,

      price: 20000,
      description: `
      This is a well-established Discord account focused on language tutoring.
      It has a strong community of language enthusiasts and offers great engagement opportunities.
      The account has been consistently active, providing valuable content and resources to its members.
      With a solid follower base and high engagement rates, this account is perfect for anyone looking to enter the language tutoring niche.
      `,

      images: [
        'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    mode: 'onChange',
  });

  const { mutateAsync } = useCreateListing();

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function nextStep() {
    // if (step < 4) {
    //   setStep(step + 1);
    // }
    // Defer the step change to the next tick to avoid immediate submit
    setTimeout(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 0);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <Step1Form />;
      case 2:
        return <Step2Form />;
      case 3:
        return <Step3Form />;
      case 4:
        return <Step4Form />;
      default:
        return null;
    }
  }

  const values = useWatch({
    control: form.control,
    compute: () => form.getValues(),
  });

  // Add a helper function to validate only current step
  function isCurrentStepValid() {
    switch (step) {
      case 1:
        return (
          values.title?.trim().length >= 5 &&
          values.platform &&
          values.username?.trim().length >= 3 &&
          values.niche
        );
      case 2:
        return (
          values.followersCount > 0 &&
          typeof values.isVerified === 'boolean' &&
          typeof values.isMonetized === 'boolean'
        );
      case 3:
        return values.price > 0 && values.description
          ? values.description?.trim().length >= 10
          : false;
      case 4:
        return Array.isArray(values.images) && values.images.length > 0;
      default:
        return false;
    }
  }

  const onError: SubmitErrorHandler<ListingValues> = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message, {
        description: 'Please fix the errors before proceeding.',
      });
    });
    return;
  };

  const onSubmit: SubmitHandler<ListingValues> = (data) => {
    // console.log('Form Data:', data);
    startTransition(async () => {
      await mutateAsync(data);
    });
  };

  return (
    <Form {...form}>
      <form
        className={'flex items-center gap-2'}
        onSubmit={form.handleSubmit(onSubmit, onError)}>
        <code className={'text-xs max-w-xs w-full overflow-x-auto'}>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </code>
        <div className={'max-w-5xl w-full mx-auto px-4 py-8 space-y-6'}>
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && 'Basic Information'}
                {step === 2 && 'Account Metrics'}
                {step === 3 && 'Pricing & Description'}
                {step === 4 && 'Screenshots & Proof'}
              </CardTitle>
            </CardHeader>
            <CardContent>{renderStep()}</CardContent>
            <CardFooter className={'flex items-center justify-between'}>
              <Button type='button' onClick={prevStep} disabled={step === 1}>
                <ChevronLeftCircle className={'size-4'} />
                Prev
              </Button>
              {step === 4 ? (
                <Button
                  type='submit'
                  disabled={!isCurrentStepValid() || isPending}>
                  <ListChecksIcon className={'size-4'} />
                  {isPending ? 'Submitting...' : 'Submit Listing'}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  type='button'
                  disabled={!isCurrentStepValid()}>
                  Next <ChevronRightCircle className={'size-4'} />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </form>
      {/* <DevTool control={form.control} /> */}
    </Form>
  );
}
