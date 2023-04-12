import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import { isEqual } from "lodash";

interface MySession extends session.Session {
  isConnected?: boolean;
}

export const userLogin = (req: Request, res: Response) => {
  const form = `
    <form method="POST" action="/session/connect">
      <label for="login">Login:</label>
      <input type="text" name="login" id="login" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" required>
      <br>
      ${req.query.error ? "<p style='color:red'>Login incorrect - try Login Jane Password doe</p>" : ""}
      <button type="submit">Login</button>
    </form>
  `;

  res.send(form);
};

export const connectUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body;

  if (login.toLowerCase() === "jane" && password === "doe") {
    (req.session as MySession).isConnected = true;
    res.redirect("/session/admin");
  } else {
    res.redirect("/session/login?error=true");
  }
};

export const admin = async (req: Request, res: Response) => {
  if ((req.session as MySession).isConnected) {
    const message = "Welcome to the Admin Page";

    const logout = `<form method="GET" action="/session/logout">
    <button type="submit">Logout</button>
  </form>`;

    res.send(`${message}, ${logout}`);
  } else {
    res.redirect("/session/login");
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logoutMessage = "Logout successful";
  const redirectButton = `<form method="GET" action="/session/login">
  <button type="submit">Login-Page</button>
</form>`;

  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send(`${logoutMessage}, ${redirectButton}`);
      }
    });
  } else {
    res.end();
  }
};
