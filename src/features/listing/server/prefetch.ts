import { prefetch, trpc } from '@/trpc/server';
import { inferInput } from '@trpc/tanstack-react-query';

type ListingsInput = inferInput<typeof trpc.listings.getPublicListings>;

/**
 * Prefetch public listings
 * @param params
 */
export function prefetchPublicListings(params: ListingsInput) {
  return prefetch(trpc.listings.getPublicListings.queryOptions());
}

/**
 * Prefetch one listing by ID
 * @param listingId
 */
export function PrefetchOneListing(listingId: string) {
  return prefetch(
    trpc.listings.getPublicListing.queryOptions({ id: listingId })
  );
}

/**
 * Prefetch my listings
 * @param params
 */
export function prefetchMyListings(params: ListingsInput) {
  return prefetch(trpc.listings.getMyListings.queryOptions());
}

/**
 * Prefetch my listing by ID
 * @param listingId
 */
export function prefetchMyListing(listingId: string) {
  return prefetch(trpc.listings.getMyListing.queryOptions({ id: listingId }));
}
