import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PricingDescriptionValues } from '@/lib/validators/listing-schemas';
import { Controller, useFormContext } from 'react-hook-form';

export default function Step3Form() {
  const form = useFormContext<PricingDescriptionValues>();

  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name='price'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='price'>Asking Price (INR) *</FieldLabel>
              <Input
                id='price'
                type='number'
                placeholder='25000'
                {...field}
                onChange={(e) =>
                  form.setValue('price', parseInt(e.target.value))
                }
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription>
                  Set your asking price for the account.
                </FieldDescription>
              )}
            </Field>
          )}
        />

        <Controller
          name='description'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='description'>Description *</FieldLabel>
              <Textarea
                id='description'
                placeholder='Add any additional details about the account here...'
                className='resize-none min-h-30'
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription>
                  Provide a detailed description of the account.
                </FieldDescription>
              )}
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}
