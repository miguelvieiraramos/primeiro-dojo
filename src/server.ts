import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import database from "./pool";


const app: Express = express()
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World kappa")
})

app.post("/users", async (req: Request, res: Response) => {
    const { name, document } = req.body
    const result = await database.query('SELECT * FROM user_dojo WHERE document = $1', [document])
    const usersWithDocument = result.rowCount

    if (usersWithDocument) {
        return res.status(400).send({ message: `User ${document} already exists.` })
    }

    const id = Date.now()
    await database.query("INSERT INTO user_dojo (id, name, document) VALUES ($1, $2, $3)", [id, name, document])
    return res.status(201).send()
})

export default app
