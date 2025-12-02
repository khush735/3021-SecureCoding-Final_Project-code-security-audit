import { calculateAssetAllocation, Asset } from '../src/portfolio/portfolioPerformance';

describe('calculateAssetAllocation Function', () => {
  it('should calculate correct percentages for uneven distributions', () => {
    const assets: Asset[] = [
      { name: 'Stocks', value: 5000 },
      { name: 'Bonds', value: 3000 },
      { name: 'Real Estate', value: 2000 }
    ];
    const result = calculateAssetAllocation(assets);
    expect(result.Stocks).toBeCloseTo(50.00);
    expect(result.Bonds).toBeCloseTo(30.00);
    expect(result['Real Estate']).toBeCloseTo(20.00);
  });

  it('should return equal percentages for even distributions', () => {
    const assets: Asset[] = [
      { name: 'Stocks', value: 5000 },
      { name: 'Bonds', value: 5000 }
    ];
    const result = calculateAssetAllocation(assets);
    expect(result.Stocks).toBe(50);
    expect(result.Bonds).toBe(50);
  });

  it('should return empty object for empty array', () => {
    expect(calculateAssetAllocation([])).toEqual({});
  });
});