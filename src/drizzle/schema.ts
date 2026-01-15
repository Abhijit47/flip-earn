import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// DATABASE CONSTANTS
const platforms = [
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

const niches = [
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

const statuses = ['active', 'ban', 'sold', 'deleted', 'inactive'] as const;

const ageRanges = [
  '13-17',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
] as const;

const timeStamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
};

// DATABASE Enums
export const platformEnum = pgEnum('platform', platforms);
export const nicheEnum = pgEnum('niche', niches);
export const statusEnum = pgEnum('status', statuses);
export const ageRangeEnum = pgEnum('age_range', ageRanges);

//=== Auth Tables ===//
export const user = pgTable('user', {
  id: uuid('id')
    .default(sql`pg_catalog.gen_random_uuid()`)
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image').default(
    'https://avatar.vercel.sh/rauchg.svg?text=UN&rounded=60'
  ),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  earned: integer('earned').default(0),
  withdrawn: integer('withdrawn').default(0),
});

export const session = pgTable(
  'session',
  {
    id: uuid('id')
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('session_userId_idx').on(table.userId)]
);

export const account = pgTable(
  'account',
  {
    id: uuid('id')
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('account_userId_idx').on(table.userId)]
);

export const verification = pgTable(
  'verification',
  {
    id: uuid('id')
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)]
);
//=== Auth Tables ===//

export const listing = pgTable('listing', {
  id: uuid().defaultRandom().primaryKey().unique().notNull(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: varchar('title').notNull(),
  platform: platformEnum('platform').notNull(),
  username: varchar('username').notNull(),
  followers: integer().notNull(),
  engagements: integer('engagements').notNull(),
  monthlyViews: integer('monthly_views').notNull(),
  niche: nicheEnum('niche').notNull(),
  price: integer('price').notNull(),
  description: varchar('description', { length: 2000 }),
  verified: boolean('verified').default(false),
  monetized: boolean('monetized').default(false),
  country: varchar('country'),
  ageRange: ageRangeEnum('age_range').notNull(),
  status: statusEnum('status').default('active'),
  featured: boolean('featured').default(false),
  images: varchar('images').array().notNull(),
  platformAssured: boolean('platform_assured'),
  isCredentialSubmitted: boolean('is_credential_submitted').default(false),
  isCredentialVerified: boolean('is_credential_verified').default(false),
  isCredentialChanged: boolean('is_credential_changed').default(false),
  ...timeStamps,
});

export const chat = pgTable('chat', {
  id: uuid().defaultRandom().primaryKey().unique().notNull(),
  listingId: uuid('listing_id').notNull(),
  userId: uuid('user_id').notNull(),
  message: text('message').notNull(),
  sender: varchar('sender').notNull(), // 'owner' or 'buyer'
  messageSent: integer('message_sent').default(0),
  messageReceived: integer('message_received').default(0),
  ...timeStamps,
});

export const credential = pgTable('credential', {
  id: uuid().defaultRandom().primaryKey().unique().notNull(),
  listingId: uuid('listing_id')
    .notNull()
    .references(() => listing.id, { onDelete: 'cascade' }),
  originalCredential: jsonb('original_credential').$type<{
    email: string;
    password: string; // make it hash
  }>(),
  updatedCredential: jsonb('updated_credential').$type<{
    email: string;
    password: string; // make it hash
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const transaction = pgTable('transaction', {
  id: uuid().defaultRandom().primaryKey().unique().notNull(),
  listingId: uuid('listing_id')
    .notNull()
    .references(() => listing.id, { onDelete: 'cascade' }),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  isPaid: boolean('is_paid').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const withdrawal = pgTable('withdrawal', {
  id: uuid().defaultRandom().primaryKey().unique().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  isWithdrawn: boolean('is_withdrawn').notNull(),
  account: jsonb('account').$type<{
    accountNumber: string;
    ifscNumber: string;
    branchCode: string;
    branchName: string;
  }>(),
  ...timeStamps,
});

//=== Relations ===//
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  listings: many(listing),
  ownerTransactions: many(transaction, { relationName: 'owner' }),
  buyerTransactions: many(transaction, { relationName: 'buyer' }),
  withdrawals: many(withdrawal),
  chats: many(chat),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const listingRelations = relations(listing, ({ one, many }) => ({
  owner: one(user, {
    fields: [listing.ownerId],
    references: [user.id],
  }),
  credentials: many(credential),
  transactions: many(transaction, { relationName: 'listing' }),
  chats: many(chat),
}));

export const chatRelations = relations(chat, ({ one }) => ({
  listing: one(listing, {
    fields: [chat.listingId],
    references: [listing.id],
  }),
  user: one(user, {
    fields: [chat.userId],
    references: [user.id],
  }),
}));

export const credentialRelations = relations(credential, ({ one }) => ({
  listing: one(listing, {
    fields: [credential.listingId],
    references: [listing.id],
  }),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
  listing: one(listing, {
    fields: [transaction.listingId],
    references: [listing.id],
    relationName: 'listing',
  }),
  owner: one(user, {
    fields: [transaction.ownerId],
    references: [user.id],
    relationName: 'owner',
  }),
  buyer: one(user, {
    fields: [transaction.userId],
    references: [user.id],
    relationName: 'buyer',
  }),
}));

export const withdrawalRelations = relations(withdrawal, ({ one }) => ({
  user: one(user, {
    fields: [withdrawal.userId],
    references: [user.id],
  }),
}));
//=== Relations ===//

//=== Type Exports ===//
export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

export type InsertSession = typeof session.$inferInsert;
export type SelectSession = typeof session.$inferSelect;

export type InsertAccount = typeof account.$inferInsert;
export type SelectAccount = typeof account.$inferSelect;

export type InsertVerification = typeof verification.$inferInsert;
export type SelectVerification = typeof verification.$inferSelect;

export type InsertListing = typeof listing.$inferInsert;
export type SelectListing = typeof listing.$inferSelect;

export type InsertChat = typeof chat.$inferInsert;
export type SelectChat = typeof chat.$inferSelect;

export type InsertCredential = typeof credential.$inferInsert;
export type SelectCredential = typeof credential.$inferSelect;

export type InsertTransaction = typeof transaction.$inferInsert;
export type SelectTransaction = typeof transaction.$inferSelect;

export type InsertWithdrawal = typeof withdrawal.$inferInsert;
export type SelectWithdrawal = typeof withdrawal.$inferSelect;
//== Type Exports ===//
