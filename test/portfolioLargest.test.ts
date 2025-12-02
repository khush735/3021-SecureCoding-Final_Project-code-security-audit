import { findLargestHolding, Asset } from '../src/portfolio/portfolioPerformance';

describe('findLargestHolding Function', () => {
  it('should find the largest holding with regular assets', () => {
    const assets: Asset[] = [
      { name: 'Stocks', value: 5000 },
      { name: 'Bonds', value: 3000 },
      { name: 'Real Estate', value: 7000 }
    ];
    expect(findLargestHolding(assets)).toEqual({ name: 'Real Estate', value: 7000 });
  });

  it('should return null for empty array', () => {
    expect(findLargestHolding([])).toBeNull();
  });

  it('should return first asset when values are tied', () => {
    const assets: Asset[] = [
      { name: 'Gold', value: 5000 },
      { name: 'Crypto', value: 5000 }
    ];
    expect(findLargestHolding(assets)).toEqual({ name: 'Gold', value: 5000 });
  });
});