import { CalculatorRequestBody } from "../types";
import { Request, Response, NextFunction } from "express";

export function validateCalculatorRequest(
  req: Request<{}, any, CalculatorRequestBody>,
  res: Response,
  next: NextFunction
) {
  const { operator, operand1, operand2 } = req.body;

  if (typeof operand1 !== "number" || typeof operand2 !== "number") {
    return res.status(400).send("Operand must be a number");
  }
  if (
    operator !== "+" &&
    operator !== "-" &&
    operator !== "*" &&
    operator !== "/"
  ) {
    return res.status(400).send("Operator must be +, -, *, or /");
  }

  next();
}
