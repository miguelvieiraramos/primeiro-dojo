import express, { Request, Response, Express, request } from 'express'
import 'dotenv/config'
import database from "./pool"
import { Client, Pool } from 'pg';


const app: Express = express()
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World kappa")
})

app.post("/users", async (req: Request, res: Response) => {
    const { name, document } = req.body
    const id = Date.now()
    await database.query("INSERT INTO user_dojo (id, name, document) VALUES ($1, $2, $3)", [id, name, document])
    return res.status(201).send()
})

export default app
