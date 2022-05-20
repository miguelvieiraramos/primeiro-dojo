import express, { Request, Response, Express, request } from 'express'
import 'dotenv/config'
import { Client } from 'pg';

const database = new Client({
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
})

const app: Express = express()
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World kappa")
})

app.post("/users", async (req: Request, res: Response) => {
    const { name, document } = req.body
    const id = Date.now()
    await database.connect()
    await database.query("INSERT INTO user_dojo (id, name, document) VALUES ($1, $2, $3)", [id, name, document])
    await database.end()
    return res.status(201).send()
})

export default app