import { Router } from "express";
import { setName, getName } from "../controller/users";

export const userRouter: Router = Router();

userRouter.get("/setname", setName);
userRouter.get("/getname", getName);