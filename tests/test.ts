import request from 'supertest'
import app from '../src/server'
import 'dotenv/config'
import database from '../src/pool'


beforeAll(async () => {
    await database.query('CREATE TABLE IF NOT EXISTS "user_dojo" (id VARCHAR(50) PRIMARY KEY, name VARCHAR(100) NOT NULL, document VARCHAR(14) UNIQUE NOT NULL)');
    await database.query("TRUNCATE user_dojo;")
})


afterEach(async() => {
    await database.query("TRUNCATE user_dojo;")
})

describe("API", () => {

    test("Should return 201 if user created", async () => {
        const old_count = (await database.query("SELECT COUNT(*) FROM user_dojo;")).rows[0]
        await request(app)
            .post("/users")
            .send({ name: "John Doe", document: "40228922" })
            .expect(201)

        const current_count = (await database.query("SELECT COUNT(*) FROM user_dojo;")).rows[0]
        expect(+current_count.count).toBe(+old_count.count + 1)
    })

    test("Should return 400 if document already exists", async () => {
        const document = 12345678900
        await database.query("INSERT INTO user_dojo (id, name, document) VALUES ($1, $2, $3)", ['batata', 'Maico', document])

        await request(app)
            .post("/users")
            .send({ name: "Pedrinho", document })
            .expect(400)

    })
})
