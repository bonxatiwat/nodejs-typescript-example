import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Request: ${req.timestamp} ${req.method} ${req.ip} ${req.originalUrl}`
  );
  next();
}
