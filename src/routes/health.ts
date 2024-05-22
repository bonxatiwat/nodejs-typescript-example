import { HealthResponseDto } from "../types";
import { Router, Request } from "express";

export const router = Router();
/**
 * @openapi
 * /health:
 *   get:
 *     description: Health check endpoint for Calculator API
 *     operationId: healthCheck
 *     tags:
 *       - health
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthStatus'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get("/", (req: Request<{}, any, HealthResponseDto>, res) => {
  res.send({ status: "OK", timestamp: req.timestamp });
});
