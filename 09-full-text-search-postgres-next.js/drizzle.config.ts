import type { Config } from "drizzle-kit";

export default {
    driver: "pg",
    schema: "./src/db/schema.ts",
    out: "./db/migrations",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;
