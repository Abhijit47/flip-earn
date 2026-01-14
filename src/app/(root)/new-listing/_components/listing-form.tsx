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
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  ListChecksIcon,
} from 'lucide-react';
import { useState } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import Step1Form from './step-1-form';
import Step2Form from './step-2-form';
import Step3Form from './step-3-form';
import Step4Form from './step-4-form';

export default function ListingForm() {
  const [step, setStep] = useState(1);

  const form = useForm<ListingValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: 'dfsdf',
      platform: 'discord',
      username: 'sdasd',
      niche: 'tech',

      followersCount: 1000,
      engagementRate: 10,
      monthlyViews: 50,
      country: 'sdas',
      audienceAgeRange: '18-24',
      isVerified: true,
      isMonetized: true,

      price: 2000,
      description: 'lorem ipsum dolor sit amet',

      images: [],
    },
    mode: 'onChange',
  });

  const onError: SubmitErrorHandler<ListingValues> = (errors) => {
    console.log('Form Errors:', errors);
  };

  const onSubmit: SubmitHandler<ListingValues> = (data) => {
    console.log('Form Data:', data);
  };

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function nextStep() {
    if (step < 4) {
      setStep(step + 1);
    }
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
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
              <Button onClick={prevStep} disabled={step === 1}>
                <ChevronLeftCircle className={'size-4'} />
                Prev
              </Button>
              {step === 4 ? (
                <Button onClick={nextStep} type='submit' disabled={step === 4}>
                  <ListChecksIcon className={'size-4'} /> Create Listing
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  type='submit'
                  disabled={!isCurrentStepValid()}>
                  Next <ChevronRightCircle className={'size-4'} />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </form>
      <DevTool control={form.control} />
    </Form>
  );
}
