import { Router } from "express";
import { userLogin, connectUser, admin, logoutUser } from "../controller/auth";

export const loginRouter: Router = Router();

loginRouter.get("/login", userLogin);
loginRouter.post("/connect", connectUser);
loginRouter.get("/admin", admin);
loginRouter.get("/logout", logoutUser);