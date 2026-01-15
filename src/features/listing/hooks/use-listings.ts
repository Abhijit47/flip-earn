import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

//=== Public Hooks for Listings ===//
/**
 * Hooks for getting public listings.
 */
export function usePublicListings() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.listings.getPublicListings.queryOptions());
}

/**
 * Hook for getting one public listing by ID.
 * @param listingId - The ID of the listing to retrieve.
 */
export function usePublicListing(listingId: string) {
  const trpc = useTRPC();
  return useSuspenseQuery(
    trpc.listings.getPublicListing.queryOptions({ id: listingId })
  );
}

//=== Private Hooks for User Listings ===//

/**
 * Hook to create listing
 */
export function useCreateListing() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.listings.createListing.mutationOptions({
      onSuccess: (data) => {
        toast.success('Listing created successfully!', {
          description: `Your listing "${data.title}" has been created.`,
        });
        queryClient.invalidateQueries(
          trpc.listings.getMyListings.queryOptions()
        );
        queryClient.invalidateQueries(
          trpc.listings.getPublicListings.queryOptions()
        );
      },
      onError: (error) => {
        toast.error('Failed to create listing.', {
          description: error.message,
        });
      },
    })
  );
}

/**
 * Hook to update my listing
 */
export function useUpdateListing() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.listings.updateMyListing.mutationOptions({
      onSuccess: (_, variables) => {
        toast.success('Listing updated successfully!', {
          description: `Your listing has been updated.`,
        });
        queryClient.invalidateQueries(
          trpc.listings.getMyListings.queryOptions()
        );
        queryClient.invalidateQueries(
          trpc.listings.getPublicListings.queryOptions()
        );
        queryClient.invalidateQueries(
          trpc.listings.getMyListing.queryOptions({ id: variables.id })
        );
      },
      onError: (error) => {
        toast.error('Failed to update listing.', {
          description: error.message,
        });
      },
    })
  );
}

/**
 * Hook to delete my listing
 */
export function useDeleteListing() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.listings.deleteMyListing.mutationOptions({
      onSuccess: () => {
        toast.success('Listing deleted successfully!', {
          description: `Your listing has been deleted.`,
        });
        queryClient.invalidateQueries(
          trpc.listings.getMyListings.queryOptions()
        );
        queryClient.invalidateQueries(
          trpc.listings.getPublicListings.queryOptions()
        );
      },
      onError: (error) => {
        toast.error('Failed to delete listing.', {
          description: error.message,
        });
      },
    })
  );
}

/**
 * Hook to get one listing
 */
export function useGetMyListing(listingId: string) {
  const trpc = useTRPC();

  return useSuspenseQuery(
    trpc.listings.getMyListing.queryOptions({ id: listingId })
  );
}

/**
 * Hook to get my listings
 */
export function useGetMyListings() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.listings.getMyListings.queryOptions());
}
