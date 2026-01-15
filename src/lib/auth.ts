import { db } from '@/drizzle/db';
import * as schema from '@/drizzle/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  advanced: {
    database: {
      generateId: 'uuid',
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema,
    transaction: true,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false, //defaults to true
  },
  experimental: {
    joins: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      earned: {
        fieldName: 'earned',
        type: 'number',
        required: false,
        defaultValue: 0,
      },
      withdrawn: {
        fieldName: 'withdrawn',
        type: 'number',
        required: false,
        defaultValue: 0,
      },
    },
  },
});

export type Session = (typeof auth.$Infer)['Session'];
