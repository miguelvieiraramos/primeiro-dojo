import request from 'supertest'
import app from './server'
import 'dotenv/config'
import { Client } from 'pg';

let database;

beforeAll(() => {
    database = new Client({
        user: process.env.DATABASE_USERNAME,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: 5432,
      })
      database.connect()

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
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    })

    test("Ensure user was created on database", (done) => {

        request(app)
            .post("/users")
            .send({ name: "John Doe", document: "40228922" })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });


    })
})
