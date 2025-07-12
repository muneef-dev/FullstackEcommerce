import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const isProduction = process.env.NODE_ENV === 'production';

// Initialize database connection
const pool = new Pool({
  connectionString: isProduction 
    ? process.env.NEON_DATABASE_URL
    : process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool });
