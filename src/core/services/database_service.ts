import { Pool } from 'pg';

export const pool = new Pool({connectionString: 'localhost:5432'})