import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  connectionString: `postgres://${config.db.user}:${config.db.password}@${config.db.host}`,
});
