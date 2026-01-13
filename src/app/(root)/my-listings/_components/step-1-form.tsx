import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BasicInformationValues,
  niches,
  platforms,
} from '@/lib/validators/listing-schemas';
import { Controller, useFormContext } from 'react-hook-form';

export default function Step1Form() {
  const form = useFormContext<BasicInformationValues>();

  return (
    <FieldSet>
      <FieldGroup>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Controller
            name='title'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='listing-title'>Listing Title *</FieldLabel>
                <Input
                  id='listing-title'
                  type='text'
                  placeholder='e.g., Premium Travel Instagram Account'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Choose a unique title for your listing.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name='platform'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='platform'>Platform *</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full capitalize' id='platform'>
                    <SelectValue placeholder='Select a platform' />
                  </SelectTrigger>
                  <SelectContent id='platform'>
                    <SelectGroup>
                      <SelectLabel>Platforms</SelectLabel>
                      {platforms.map((platform) => (
                        <SelectItem
                          key={platform}
                          value={platform}
                          className={'capitalize'}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Select the platform of the account you are listing.
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </div>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Controller
            name='username'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='username'>Username/Handle *</FieldLabel>
                <Input
                  id='username'
                  type='text'
                  placeholder='@Max Leiter'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Choose a unique username for your account.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name='niche'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='niche'>Niche/Category *</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full capitalize' id='niche'>
                    <SelectValue placeholder='Select a niche' />
                  </SelectTrigger>
                  <SelectContent id='niche'>
                    <SelectGroup>
                      <SelectLabel>Niches</SelectLabel>
                      {niches.map((niche) => (
                        <SelectItem
                          key={niche}
                          value={niche}
                          className={'capitalize'}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Choose the category that best fits your listing.
                </FieldDescription>
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </FieldSet>
  );
}
