import express, { Request, Response, NextFunction } from "express";

let name: string | null = null;

export const setName = (req: Request, res: Response, next: NextFunction) => {
    name = "Jane Doe";
    res.status(200).json({ message: `Name ${name} erfolgreich gespeichert!` });
    next();
}

export const getName = async (req: Request, res: Response, next: NextFunction) => {
    if (name) {
        res.status(200).json({ name });
    } else {
        res.status(404).json({ error: "Kein Name gefunden." });
    }
};
