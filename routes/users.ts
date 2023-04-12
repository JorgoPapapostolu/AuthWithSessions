import { Router } from "express";
import { setName } from "../controller/users";

export const userRouter: Router = Router();

userRouter.get("/setname", setName);