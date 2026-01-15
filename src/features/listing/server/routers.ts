import { db } from '@/drizzle/db';
import { listing } from '@/drizzle/schema';
import {
  listingId,
  listingSchema,
  updateListingSchema,
} from '@/lib/validators/listing-schemas';
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import z from 'zod';

export const listingRouter = createTRPCRouter({
  // Get listings - public
  getPublicListings: baseProcedure.query(async ({ ctx }) => {
    const auth = await ctx;
    const listings = await db.query.listing.findMany({
      where(fields, ops) {
        // only fetch those listings which are not belongs to me
        if (auth?.user?.id) {
          return ops.ne(fields.ownerId, auth.user.id);
        } else {
          return undefined;
        }
      },
      limit: 10,
    });
    return listings;
  }),

  // Get one listing by ID - public
  getPublicListing: baseProcedure
    .input(z.object({ id: z.uuid() }))
    .query(async ({ input, ctx }) => {
      const auth = await ctx;
      const listingItem = await db.query.listing.findFirst({
        with: {
          owner: {
            columns: {
              id: true,
              name: true,
              email: true,
              image: true,
              createdAt: true,
            },
          },
        },
        where: (fields, { and, eq, ne }) => {
          // (fields.id, input.id) should be equal
          // and ownerId should not be equal to auth.user.id (if auth.user.id exists)
          if (auth?.user?.id) {
            return and(
              eq(fields.id, input.id),
              ne(fields.ownerId, auth.user.id)
            );
          } else {
            return undefined;
          }
        },
      });
      if (!listingItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Listing not found.<Public>',
        });
      }
      return listingItem;
    }),

  //=== User Protected Routes ===//
  createListing: protectedProcedure
    .input(listingSchema)
    .mutation(async ({ input, ctx }) => {
      const auth = ctx.auth;

      try {
        const [newListing] = await db
          .insert(listing)
          .values({
            ownerId: auth.user.id,
            title: input.title,
            platform: input.platform,
            username: input.username,
            followers: input.followersCount,
            engagements: input.engagementRate,
            monthlyViews: input.monthlyViews,
            niche: input.niche,
            price: input.price,
            description: input.description,
            verified: input.isVerified,
            monetized: input.isMonetized,
            country: input.country,
            ageRange: input.audienceAgeRange,
            status: 'active',
            featured: false,
            images: [...input.images],
            platformAssured: false,
            isCredentialSubmitted: false,
            isCredentialVerified: false,
            isCredentialChanged: false,
          })
          .returning({ id: listing.id, title: listing.title });

        if (!newListing) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create listing.',
          });
        }

        return newListing;
      } catch (error) {
        console.error('Error creating listing:', error);
        throw error;
      }
    }),

  updateMyListing: protectedProcedure
    .input(updateListingSchema)
    .mutation(async ({ input, ctx }) => {
      const auth = ctx.auth;

      try {
        const result = await db.transaction(async (tx) => {
          const existingListing = await tx.query.listing.findFirst({
            where: (fields, { eq }) =>
              eq(fields.id, input.id) && eq(fields.ownerId, auth.user.id),
          });

          if (!existingListing) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Listing not found.',
            });
          }
          await tx
            .update(listing)
            .set({
              ownerId: auth.user.id,
              title: input.title,
              platform: input.platform,
              username: input.username,
              followers: input.followersCount,
              engagements: input.engagementRate,
              monthlyViews: input.monthlyViews,
              niche: input.niche,
              price: input.price,
              description: input.description,
              verified: input.isVerified,
              monetized: input.isMonetized,
              country: input.country,
              ageRange: input.audienceAgeRange,
              status: 'active',
              featured: false,
              images: [...input.images],
              platformAssured: false,
              isCredentialSubmitted: false,
              isCredentialVerified: false,
              isCredentialChanged: false,
            })
            .where(eq(listing.id, input.id));

          return { success: true };
        });
        return result;
      } catch (error) {
        console.error('Error updating listing:', error);
        throw error;
      }
    }),

  getMyListing: protectedProcedure
    .input(listingId)
    .query(async ({ input, ctx }) => {
      const auth = ctx.auth;

      try {
        const listingItem = await db.query.listing.findFirst({
          where: (fields, { eq }) =>
            eq(fields.id, input.id) && eq(fields.ownerId, auth.user.id),
        });
        if (!listingItem) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Listing not found.',
          });
        }
        return listingItem;
      } catch (error) {
        console.error('Error fetching listing:', error);
        throw error;
      }
    }),

  deleteMyListing: protectedProcedure
    .input(listingId)
    .mutation(async ({ input, ctx }) => {
      const auth = ctx.auth;

      try {
        const [deleteListing] = await db
          .delete(listing)
          .where(
            and(eq(listing.id, input.id), eq(listing.ownerId, auth.user.id))
          )
          .returning({ id: listing.id });

        if (!deleteListing) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Listing not found or could not be deleted.',
          });
        }

        return deleteListing;
      } catch (error) {
        console.error('Error deleting listing:', error);
        throw error;
      }
    }),

  getMyListings: protectedProcedure.query(async ({ ctx }) => {
    const auth = ctx.auth;
    try {
      const listings = await db.query.listing.findMany({
        where: eq(listing.ownerId, auth.user.id),
      });
      return listings;
    } catch (error) {
      console.error('Error fetching user listings:', error);
      throw error;
    }
  }),
});
