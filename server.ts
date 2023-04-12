import express, { Application, Request, Response } from "express";
import session from 'express-session';
const app: Application = express();

import { userRouter } from './routes/users';
import { loginRouter } from './routes/auth';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
  }));

app.get("/", (req: Request, res: Response) => {
  const firstSteps = "1. Call /setname to store Jane Doe. 2. Call /getname to display the name";
  const goToLoginPage = `<form method="GET" action="/session/login">
  <button type="submit">Go to Login-Page</button>
</form>`;
    res.send(`${firstSteps}, ${goToLoginPage}`);
  });

app.use('/', userRouter);
app.use('/session', loginRouter);

export default app;