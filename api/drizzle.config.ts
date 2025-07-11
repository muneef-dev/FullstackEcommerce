import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/productSchema.ts','./src/db/userSchema.ts','./src/db/orderSchema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true, // it will show more logs about whats happaning
  strict: true, // which will enforece more rules
});
