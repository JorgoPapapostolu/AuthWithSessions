import express, { Application, Request, Response } from "express";
const app: Application = express();

import { userRouter } from './routes/users';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Test");
  });

app.use('/', userRouter);

export default app;