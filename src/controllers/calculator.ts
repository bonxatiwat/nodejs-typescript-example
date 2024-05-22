import { CalculatorDao } from "../daos";
import { NotFoundError } from "../error";
import { CalculatorMapper } from "../mappers/calculator";
import { CalculatorCommandMapper } from "../mappers/calculatorCommand";
import { Calculator } from "../models";
import { CalculatorCommandDto, CalculatorResultDto } from "../types";

export class CalculatorController {
  constructor(private calculatorDao: CalculatorDao) {}

  async getAllCalculators(): Promise<CalculatorResultDto[]> {
    const allCalculations = await this.calculatorDao.list();
    return allCalculations.map(calculation =>
      CalculatorMapper.toDto(calculation)
    );
  }

  async getCalculationById(id: string): Promise<CalculatorResultDto> {
    const calculation = await this.getCalculationOrThrowError(id);
    return CalculatorMapper.toDto(calculation);
  }

  async deleteCalculation(id: string): Promise<void> {
    await this.getCalculationOrThrowError(id);
    await this.calculatorDao.delete(id);
  }

  async updateCalculation(id: string, command: CalculatorCommandDto) {
    const calculation = await this.getCalculationOrThrowError(id);
    calculation.update(CalculatorCommandMapper.toDomain(command));
    const updatedCalculation = await this.calculatorDao.upsert(id, calculation);
    return CalculatorMapper.toDto(updatedCalculation);
  }

  async createCalculation(
    command: CalculatorCommandDto
  ): Promise<CalculatorResultDto> {
    const calculation = new Calculator(
      CalculatorCommandMapper.toDomain(command)
    );
    const savedCalculation = await this.calculatorDao.create(calculation);
    return CalculatorMapper.toDto(savedCalculation);
  }

  private async getCalculationOrThrowError(id: string): Promise<Calculator> {
    const result = await this.calculatorDao.read(id);
    if (!result) {
      throw new NotFoundError(`Calculation not found for ID ${id}`);
    }
    return result;
  }
}
