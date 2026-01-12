import { defineConfig } from 'drizzle-kit';
import './envConfig';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
  breakpoints: isDev,
  verbose: isDev,
});
