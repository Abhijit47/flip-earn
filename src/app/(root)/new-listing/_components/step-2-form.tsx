import {
  Country,
  CountryDropdown,
} from '@/components/extended/country-dropdown';
import { Checkbox } from '@/components/ui/checkbox';
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AccountMetricsValues,
  ageRanges,
} from '@/lib/validators/listing-schemas';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function Step2Form() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const form = useFormContext<AccountMetricsValues>();

  return (
    <FieldSet>
      <FieldGroup>
        <div className={'grid grid-cols-1 md:grid-cols-3 gap-4'}>
          <Controller
            name='followersCount'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='followers-count'>
                  Followers Count *
                </FieldLabel>
                <Input
                  id='followers-count'
                  type='number'
                  placeholder='10000'
                  {...field}
                  onChange={(e) =>
                    form.setValue('followersCount', parseInt(e.target.value))
                  }
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Mention the total number of followers/subscribers.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name='engagementRate'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='engagement-rate'>
                  Engagement Rate (%)
                </FieldLabel>
                <Input
                  id='engagement-rate'
                  type='number'
                  placeholder='4'
                  {...field}
                  onChange={(e) =>
                    form.setValue('engagementRate', parseInt(e.target.value))
                  }
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Average engagement rate of the account.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name='monthlyViews'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='monthly-views'>
                  Monthly Views/Impressions
                </FieldLabel>
                <Input
                  id='monthly-views'
                  type='number'
                  placeholder='10000'
                  {...field}
                  onChange={(e) =>
                    form.setValue('monthlyViews', parseInt(e.target.value))
                  }
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Average monthly views or impressions.
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </div>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Controller
            name='country'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='country'>
                  Primary Audience Country
                </FieldLabel>
                <CountryDropdown
                  placeholder='Country'
                  defaultValue={field.value}
                  onChange={(country) => {
                    field.onChange(country.alpha3);
                    setSelectedCountry(country);
                  }}
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Main country where the audience is located.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name='audienceAgeRange'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='audience-age'>
                  Primary Audience Age Range
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full' id='audience-age'>
                    <SelectValue placeholder='Select a age range' />
                  </SelectTrigger>
                  <SelectContent id='audience-age'>
                    {ageRanges.map((ageRange) => (
                      <SelectItem key={ageRange} value={ageRange}>
                        {ageRange} age
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Main age range of the audience (e.g., 18-24).
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name='isVerified'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}
              orientation='horizontal'>
              <Checkbox
                id='account-verified'
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor='account-verified' className='font-normal'>
                Account is verified on the platform
              </FieldLabel>
            </Field>
          )}
        />
        <Controller
          name='isMonetized'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              aria-invalid={fieldState.invalid}
              orientation='horizontal'>
              <Checkbox
                id='account-monetized'
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor='account-monetized' className='font-normal'>
                Account is monetized
              </FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}
