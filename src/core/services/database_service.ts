import { Pool } from 'pg';

export const pool = new Pool({connectionString: 'postgres://postgres:root@localhost:5432'})