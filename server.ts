import express, { Request, Response, Express } from 'express'

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World kappa")
})

app.post("/users", (req: Request, res: Response) => {
    return res.status(201).send()
})

export default app