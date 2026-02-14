import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

const sql = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(sql, { schema });

export default db;
