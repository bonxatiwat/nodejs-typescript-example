import path from "path";
import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import openApiDoc from "../schemas/openapi.json";
export const router = Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(openApiDoc));

router.use(
  "/openapi.json",
  express.static(path.join(__dirname, "../schemas/openapi.json"))
);
