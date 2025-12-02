import express from "express";
import {
  calculatePortfolioPerformance,
  findLargestHolding,
  calculateAssetAllocation,
  Asset,
} from "./portfolio/portfolioPerformance";

const app = express();
app.use(express.json());

// Basic Root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  const healthCheck = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
    version: "1.0.0",
  };
  res.status(200).json(healthCheck);
});

// Portfolio performance endpoint
app.get("/api/v1/portfolio/performance", (req, res) => {
  const initialInvestment = Number(req.query.initial);
  const currentValue = Number(req.query.current);

  // Input validation
  if (isNaN(initialInvestment) || isNaN(currentValue)) {
    return res.status(400).json({
      error:
        "Invalid query parameters. Please provide numeric values for 'initial' and 'current'.",
    });
  }

  const result = calculatePortfolioPerformance(
    initialInvestment,
    currentValue
  );
  res.status(200).json(result);
});

// Largest holding endpoint
app.get("/api/v1/portfolio/largest-holding", (req, res) => {
  const sampleAssets: Asset[] = [
    { name: "Stocks", value: 5000 },
    { name: "Bonds", value: 3000 },
    { name: "Real Estate", value: 7000 },
    { name: "Gold", value: 2000 },
  ];

  const result = findLargestHolding(sampleAssets);
  res.json({ largestHolding: result });
});

// Asset allocation endpoint
app.get("/api/v1/portfolio/allocation", (req, res) => {
  const sampleAssets: Asset[] = [
    { name: "Stocks", value: 5000 },
    { name: "Bonds", value: 3000 },
    { name: "Real Estate", value: 7000 },
    { name: "Gold", value: 2000 },
  ];

  const result = calculateAssetAllocation(sampleAssets);
  res.json({ allocation: result });
});

export default app;
