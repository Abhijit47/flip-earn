CREATE TYPE "public"."age_range" AS ENUM('13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+');
CREATE TYPE "public"."niche" AS ENUM('lifestyle', 'fitness', 'food', 'travel', 'tech', 'gaming', 'fashion', 'beauty', 'business', 'education', 'entertainment', 'music', 'art', 'sports', 'health', 'finance', 'other');
CREATE TYPE "public"."platform" AS ENUM('youtube', 'instagram', 'tiktok', 'facebook', 'twitter', 'linkedin', 'pinterest', 'snapchat', 'twitch', 'discord');
CREATE TYPE "public"."status" AS ENUM('active', 'ban', 'sold', 'deleted', 'inactive');
CREATE TABLE "chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"message" text NOT NULL,
	"sender" varchar NOT NULL,
	"message_sent" integer DEFAULT 0,
	"message_received" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "chat_id_unique" UNIQUE("id")
);

CREATE TABLE "credential" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"original_credential" jsonb,
	"updated_credential" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "credential_id_unique" UNIQUE("id")
);

CREATE TABLE "listing" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"title" varchar NOT NULL,
	"platform" "platform" NOT NULL,
	"username" varchar NOT NULL,
	"followers" integer NOT NULL,
	"engagements" integer NOT NULL,
	"monthly_views" integer NOT NULL,
	"niche" "niche" NOT NULL,
	"price" integer NOT NULL,
	"description" varchar(2000),
	"verified" boolean DEFAULT false,
	"monetized" boolean DEFAULT false,
	"country" varchar,
	"age_range" "age_range" NOT NULL,
	"status" "status" DEFAULT 'active',
	"featured" boolean DEFAULT false,
	"images" varchar[] NOT NULL,
	"platform_assured" boolean,
	"is_credential_submitted" boolean DEFAULT false,
	"is_credential_verified" boolean DEFAULT false,
	"is_credential_changed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "listing_id_unique" UNIQUE("id")
);

CREATE TABLE "transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"is_paid" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transaction_id_unique" UNIQUE("id")
);

CREATE TABLE "withdrawal" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"is_withdrawn" boolean NOT NULL,
	"account" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "withdrawal_id_unique" UNIQUE("id")
);

ALTER TABLE "account" ALTER COLUMN "id" SET DATA TYPE uuid;
ALTER TABLE "account" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();
ALTER TABLE "account" ALTER COLUMN "user_id" SET DATA TYPE uuid;
ALTER TABLE "session" ALTER COLUMN "id" SET DATA TYPE uuid;
ALTER TABLE "session" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();
ALTER TABLE "session" ALTER COLUMN "user_id" SET DATA TYPE uuid;
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE uuid;
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();
ALTER TABLE "user" ALTER COLUMN "image" SET DEFAULT 'https://avatar.vercel.sh/rauchg.svg?text=UN&rounded=60';
ALTER TABLE "verification" ALTER COLUMN "id" SET DATA TYPE uuid;
ALTER TABLE "verification" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();
ALTER TABLE "user" ADD COLUMN "earned" integer DEFAULT 0;
ALTER TABLE "user" ADD COLUMN "withdrawn" integer DEFAULT 0;
ALTER TABLE "credential" ADD CONSTRAINT "credential_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "listing" ADD CONSTRAINT "listing_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "withdrawal" ADD CONSTRAINT "withdrawal_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;