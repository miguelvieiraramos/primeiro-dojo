import { Client, Pool } from 'pg';

const database = new Pool({
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
})

export default database;
