import { CalculatorCommandOperator } from "../../types";
import { CalculatorDao } from ".";
import { Calculator } from "../../models";

interface MockCalculatorDbData {
  id: string;
  res?: number;
  msg?: string;
  opr: "+" | "-" | "*" | "/";
  op1: number;
  op2: number;
  ts: number;
}

const mockDb: { [id: string]: MockCalculatorDbData } = {
  "1": { id: "1", res: 3, opr: "+", op1: 1, op2: 2, ts: 1 },
  "2": { id: "2", res: 2, opr: "-", op1: 3, op2: 1, ts: 2 },
  "3": { id: "3", res: 6, opr: "*", op1: 2, op2: 3, ts: 3 }
};

export class MockCalculatorDao implements CalculatorDao {
  private counter = 3;

  async create(calculator: Calculator): Promise<Calculator> {
    const calculationPersistence = this.toPersistence(calculator);
    mockDb[calculationPersistence.id] = calculationPersistence;
    return this.toDomain(calculationPersistence);
  }

  async read(id: string): Promise<Calculator | undefined> {
    const result = mockDb[id];
    return result ? this.toDomain(result) : undefined;
  }

  async upsert(id: string, calculator: Calculator): Promise<Calculator> {
    const calculationPersistence = {
      ...this.toPersistence(calculator),
      ts: MockCalculatorDao.getCurrentTimestamp()
    };
    mockDb[id] = calculationPersistence;
    return this.toDomain(calculationPersistence);
  }

  async delete(id: string): Promise<void> {
    delete mockDb[id];
  }

  async list(): Promise<Calculator[]> {
    return Object.values(mockDb).map(calculationPersistence =>
      this.toDomain(calculationPersistence)
    );
  }

  private generateId(): string {
    this.counter++;
    return this.counter.toString();
  }

  private static getCurrentTimestamp(): number {
    return Date.now();
  }

  private toPersistence(calculator: Calculator): MockCalculatorDbData {
    return {
      id: calculator.metadata?.id ?? this.generateId(),
      res: calculator.result?.value,
      msg: calculator.result?.message,
      opr: calculator.command.operator,
      op1: calculator.command.operand1,
      op2: calculator.command.operand2,
      ts:
        calculator.metadata?.timestamp ??
        MockCalculatorDao.getCurrentTimestamp()
    };
  }

  private static dbOperatorMapping = Object.values(
    CalculatorCommandOperator
  ).reduce(
    (mapping, value) => ({
      ...mapping,
      [value]: value
    }),
    {}
  ) as { [k in CalculatorCommandOperator]: CalculatorCommandOperator };

  private toDomain(calculationPersistence: MockCalculatorDbData): Calculator {
    const { id, res, msg, opr, op1, op2, ts } = calculationPersistence;
    return new Calculator(
      {
        operator: MockCalculatorDao.dbOperatorMapping[opr],
        operand1: op1,
        operand2: op2
      },
      { value: res, message: msg },
      { id, timestamp: ts }
    );
  }
}
