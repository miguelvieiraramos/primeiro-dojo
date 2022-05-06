import request from 'supertest'
import app from './server'

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
})