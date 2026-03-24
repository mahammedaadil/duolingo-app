import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

const sql = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }, //when run local db must comment out ssl part
  max: 1,
});
const db = drizzle(sql, { schema });

export default db;
