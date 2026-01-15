import { z } from 'zod';

export const platforms = [
  'youtube',
  'instagram',
  'tiktok',
  'facebook',
  'twitter',
  'linkedin',
  'pinterest',
  'snapchat',
  'twitch',
  'discord',
] as const;

export const niches = [
  'lifestyle',
  'fitness',
  'food',
  'travel',
  'tech',
  'gaming',
  'fashion',
  'beauty',
  'business',
  'education',
  'entertainment',
  'music',
  'art',
  'sports',
  'health',
  'finance',
  'other',
] as const;

export const ageRanges = [
  '13-17',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
] as const;

const basicInformationSchema = z.object({
  title: z.string().min(5).max(100),
  platform: z.enum(platforms),
  username: z.string().min(3).max(50),
  niche: z.enum(niches),
});

const accountMetricsSchema = z.object({
  followersCount: z.number().positive().min(1),
  engagementRate: z.number().positive().min(1).max(100),
  monthlyViews: z.number().positive().min(1),
  country: z.string().min(2).max(50),
  audienceAgeRange: z.enum(ageRanges),
  isVerified: z.boolean(),
  isMonetized: z.boolean(),
});

const pricingDescriptionSchema = z.object({
  price: z.number().positive().min(1),
  description: z.string().min(10).max(5000).optional(),
});

const screenshotsProofSchema = z.object({
  images: z.array(z.string()).max(5),
});

export const listingSchema = z
  .object({})
  .extend(basicInformationSchema.shape)
  .extend(accountMetricsSchema.shape)
  .extend(pricingDescriptionSchema.shape)
  .extend(screenshotsProofSchema.shape);

export const updateListingSchema = z
  .object({ id: z.uuid() })
  .extend(listingSchema.shape);
//listingSchema.partial();

export const listingId = updateListingSchema.pick({ id: true });

export type BasicInformationValues = z.infer<typeof basicInformationSchema>;
export type AccountMetricsValues = z.infer<typeof accountMetricsSchema>;
export type PricingDescriptionValues = z.infer<typeof pricingDescriptionSchema>;
export type ScreenshotsProofValues = z.infer<typeof screenshotsProofSchema>;
export type ListingValues = z.infer<typeof listingSchema>;

export type UpdateListingValues = z.infer<typeof updateListingSchema>;
