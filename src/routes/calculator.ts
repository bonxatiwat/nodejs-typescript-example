import { CalculatorController } from "../controllers/calculator";
import {
  CalculatorCommandDto,
  CalculatorRequestBody,
  CalculatorResultDto
} from "../types";
import { Router, Request, NextFunction } from "express";

export class CalculationRouter {
  static basePath = "/calculator";
  router: Router;
  constructor(private calculatorController: CalculatorController) {
    this.router = Router();
    this.createGetAllCalculations();
    this.createGetCalculationById();
    this.createDeleteCalculationById();
    this.createUpdateCalculationById();
    this.createCreateCalculation();
  }

  private createGetAllCalculations() {
    /**
     * @openapi
     * /calculator:
     *   get:
     *     description: Get all calculations
     *     operationId: getAllCalculations
     *     tags:
     *       - calculator
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/CalculatorResult'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */
    this.router.get(
      "/",
      async (req: Request<{}, CalculatorResultDto[]>, res) => {
        const allCalculations =
          await this.calculatorController.getAllCalculators();
        res.send(allCalculations);
      }
    );
  }

  private createGetCalculationById() {
    /**
     * @openapi
     * /calculator/{id}:
     *   get:
     *     description: Get calculation by ID
     *     operationId: getCalculationById
     *     tags:
     *       - calculator
     *     parameters:
     *       - $ref: '#/components/parameters/CalculatorId'
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/CalculatorResult'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */
    this.router.get(
      "/:id",
      async (req: Request<{ id: string }, CalculatorResultDto>, res) => {
        const { id } = req.params;
        const result = await this.calculatorController.getCalculationById(id);
        res.send(result);
      }
    );
  }

  private createDeleteCalculationById() {
    /**
     * @openapi
     * /calculator/{id}:
     *   delete:
     *     description: Delete calculation by ID
     *     operationId: deleteCalculationById
     *     tags:
     *       - calculator
     *     parameters:
     *       - $ref: '#/components/parameters/CalculatorId'
     *     responses:
     *       '204':
     *         description: Deleted
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */

    this.router.delete(
      "/:id",
      async (req: Request<{ id: string }, any>, res) => {
        const { id } = req.params;
        await this.calculatorController.deleteCalculation(id);
        res.send(204).end();
      }
    );
  }

  private createUpdateCalculationById() {
    /**
     * @openapi
     * /calculator/{id}:
     *   put:
     *     description: Update a calculation
     *     operationId: updateCalculation
     *     tags:
     *       - calculator
     *     parameters:
     *       - $ref: '#/components/parameters/CalculatorId'
     *     requestBody:
     *       $ref: '#/components/requestBodies/CalculatorCommand'
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/CalculatorResult'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */
    this.router.put(
      "/:id",
      async (
        req: Request<{ id: string }, CalculatorResultDto, CalculatorCommandDto>,
        res
      ) => {
        const { id } = req.params;
        const { operator, operand1, operand2 } = req.body;
        const updatedCalculation =
          await this.calculatorController.updateCalculation(id, {
            operator,
            operand1,
            operand2
          });

        res.send(updatedCalculation);
      }
    );
  }

  private createCreateCalculation() {
    /**
     * @openapi
     * /calculator:
     *   post:
     *     description: Create a calculation
     *     operationId: createCalculation
     *     tags:
     *       - calculator
     *     requestBody:
     *       $ref: '#/components/requestBodies/CalculatorCommand'
     *     responses:
     *       '201':
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/CalculatorResult'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */
    this.router.post(
      "/",
      async (
        req: Request<{}, CalculatorResultDto, CalculatorRequestBody>,
        res
      ) => {
        const { operator, operand1, operand2 } = req.body;
        const newCalculation =
          await this.calculatorController.createCalculation({
            operator,
            operand1,
            operand2
          });
        res.status(201).send(newCalculation);
      }
    );
  }
}
