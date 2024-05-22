import { Calculator } from "../../models/calculator";

export interface CalculatorDao {
  create(calculator: Calculator): Promise<Calculator>;
  read(id: string): Promise<Calculator | undefined>;
  upsert(id: string, calculator: Calculator): Promise<Calculator>;
  delete(id: string): Promise<void>;
  list(): Promise<Calculator[]>;
}

export * from "./mock";
