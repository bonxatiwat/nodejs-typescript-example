import express from "express";
import "express-async-errors";
import { healthRouter, apiDocsRouter } from "./routes";
import {
  addTimestamp,
  errorHandler,
  logger,
  openApiValidator
} from "./middlewares";
import { CalculatorDao, MockCalculatorDao } from "./daos";
import { CalculatorController } from "./controllers/calculator";
import { CalculationRouter } from "./routes/calculator";
import { mongoClient } from "./services/mongodb";
import { MongoCalculatorDao } from "./daos/calculator/mongo";

const app = express();
const port = 3000;

app.use(express.json());
app.use(addTimestamp);
app.use(logger);
app.use(openApiValidator);

// const calculatorDao: CalculatorDao = new MockCalculatorDao();
const calculatorDao: CalculatorDao = new MongoCalculatorDao(mongoClient);
const calculatorController = new CalculatorController(calculatorDao);
const calculatorRouter = new CalculationRouter(calculatorController);

app.use("/api-docs", apiDocsRouter);
app.use("/health", healthRouter);
app.use(CalculationRouter.basePath, calculatorRouter.router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
