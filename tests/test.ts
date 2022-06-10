import request from 'supertest'
import app from '../src/server'
import 'dotenv/config'
import database from '../src/pool'


beforeAll(async () => {
    await database.query('CREATE TABLE IF NOT EXISTS "user_dojo" (id VARCHAR(50) PRIMARY KEY, name VARCHAR(100) NOT NULL, document VARCHAR(14) UNIQUE NOT NULL)');
    await database.query("TRUNCATE user_dojo;")
})

afterAll(async () => {
    await database.end()
})

afterEach(async() => {
    await database.query("TRUNCATE user_dojo;")
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

    test("Create an user 2", (done) => {
        /**
         * id, name, document
         */
        request(app)
            .post("/users")
            .send({ name: "Doe John", document: "12346" })
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
