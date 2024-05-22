import { ErrorDto } from "../types";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response<ErrorDto>,
  next: NextFunction
) {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .send({ message: err.message || "Internal server error" });
}
