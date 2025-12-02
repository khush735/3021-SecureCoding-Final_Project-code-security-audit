export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

export function calculatePortfolioPerformance(
  initialInvestment: number = 10000,
  currentValue: number = 12000
): PortfolioPerformance {
  
    // Correct calculations
  const profitOrLoss = currentValue - initialInvestment;
  const percentageChange = (profitOrLoss / initialInvestment) * 100;

  
  // Avoid if statement
  const performanceSummary = 
    percentageChange > 20 ? `The portfolio has gained significantly with a profit of $${profitOrLoss.toFixed(2)}.` :
    percentageChange < -20 ? `The portfolio has lost significantly with a loss of $${Math.abs(profitOrLoss).toFixed(2)}.` :
    percentageChange > 0 ? `The portfolio has gained moderately with a profit of $${profitOrLoss.toFixed(2)}.` :
    percentageChange < 0 ? `The portfolio has lost moderately with a loss of $${Math.abs(profitOrLoss).toFixed(2)}.` :
    `The portfolio has no change.`;

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
  };
}

export interface Asset {
  name: string;
  value: number;
}

// Function 1: Find largest holding
export function findLargestHolding(assets: Asset[]): Asset | null {
  if (assets.length === 0) return null;
  return assets.reduce((max, asset) => asset.value > max.value ? asset : max);
}

// Function 2: Calculate asset allocation
export function calculateAssetAllocation(assets: Asset[]): { [key: string]: number } {
  if (assets.length === 0) return {};
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const allocation: { [key: string]: number } = {};
  
  assets.forEach(asset => {
    allocation[asset.name] = (asset.value / totalValue) * 100;
  });
  
  return allocation;
}