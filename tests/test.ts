import request from 'supertest'
import app from '../src/server'
import 'dotenv/config'
import { Client } from 'pg';

let database: Client;

beforeAll(async () => {
    database = new Client({
        user: process.env.DATABASE_USERNAME,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: 5432,
    })
    await database.connect()

    await database.query('CREATE TABLE IF NOT EXISTS "user_dojo" (id VARCHAR(50) PRIMARY KEY, name VARCHAR(100) NOT NULL, document VARCHAR(14) UNIQUE NOT NULL)');
})

afterAll(async () => {
    await database.end()
})

describe("API", () => {
    test("Create an user", (done) => {
        /**
         * id, name, document
         */
        request(app)
            .post("/users")
            .send({ name: "John Doe", document: "40228922" })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    })

    test("Ensure user was created on database", async () => {
        const old_count = (await database.query("SELECT COUNT(*) FROM user_dojo;")).rows[0]
        await request(app)
            .post("/users")
            .send({ name: "John Doe", document: "40228922" })
            .expect(201)
        const current_count = (await database.query("SELECT COUNT(*) FROM user_dojo;")).rows[0]
        expect(+current_count.count).toBe(+old_count.count + 1)
    })
})
