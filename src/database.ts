import { Client } from 'pg';

const pool = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root',
    database: 'postgres'
});

pool.connect();

pool.query(`SELECT * FROM public.user`, (err, res) => {
    if(!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    pool.end();
})