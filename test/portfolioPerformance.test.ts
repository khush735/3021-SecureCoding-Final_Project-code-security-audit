import { calculatePortfolioPerformance } from '../src/portfolio/portfolioPerformance';

describe('Portfolio Performance', () => {
  it('should calculate profit correctly', () => {
    const result = calculatePortfolioPerformance(10000, 12000);
    expect(result.profitOrLoss).toBe(2000);
  });

  it('should calculate loss correctly', () => {
    const result = calculatePortfolioPerformance(10000, 8000);
    expect(result.profitOrLoss).toBe(-2000);
  });

  it('should handle no change', () => {
    const result = calculatePortfolioPerformance(10000, 10000);
    expect(result.profitOrLoss).toBe(0);
  });
});