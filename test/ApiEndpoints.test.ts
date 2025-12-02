import request from "supertest";
import app from "../src/app";

describe("API Endpoint Tests", () => {
  
  // Health check
   it("should return health status", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("version");
  });

  
  // Portfolio Performance
   it("should calculate performance with gain", async () => {
    const response = await request(app)
      .get("/api/v1/portfolio/performance?initial=10000&current=12000");
    expect(response.status).toBe(200);
    expect(response.body.profitOrLoss).toBe(2000);
    expect(response.body.percentageChange).toBe(20);
  });

  it("should calculate performance with loss", async () => {
    const response = await request(app)
      .get("/api/v1/portfolio/performance?initial=10000&current=8000");
    expect(response.status).toBe(200);
    expect(response.body.profitOrLoss).toBe(-2000);
    expect(response.body.percentageChange).toBe(-20);
  });

  it("should calculate performance with no change", async () => {
    const response = await request(app)
      .get("/api/v1/portfolio/performance?initial=10000&current=10000");
    expect(response.status).toBe(200);
    expect(response.body.profitOrLoss).toBe(0);
    expect(response.body.percentageChange).toBe(0);
  });

  it("should return 400 for invalid initial parameter", async () => {
    const response = await request(app)
      .get("/api/v1/portfolio/performance?initial=abc&current=12000");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should include performance summary", async () => {
    const response = await request(app)
      .get("/api/v1/portfolio/performance?initial=10000&current=13000");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("performanceSummary");
    expect(response.body.performanceSummary).toContain("profit of $3000.00");
  });

  
  // Largest Holding
  it("should return largest holding with correct properties", async () => {
    const response = await request(app).get("/api/v1/portfolio/largest-holding");
    expect(response.status).toBe(200);
    const holding = response.body.largestHolding;
    expect(holding).toHaveProperty("name");
    expect(holding).toHaveProperty("value");
  });

  it("largest holding should be Real Estate", async () => {
    const response = await request(app).get("/api/v1/portfolio/largest-holding");
    expect(response.status).toBe(200);
    expect(response.body.largestHolding.name).toBe("Real Estate");
  });

  
  // Asset Allocation
  it("should return allocation that sums to 100%", async () => {
    const response = await request(app).get("/api/v1/portfolio/allocation");
    expect(response.status).toBe(200);
    const allocation = response.body.allocation;
    const sum = (Object.values(allocation) as number[]).reduce(
      (total: number, percent: number) => total + percent,
      0
    );
    expect(sum).toBeCloseTo(100, 1);
  });

  it("should include all assets in allocation", async () => {
    const response = await request(app).get("/api/v1/portfolio/allocation");
    expect(response.status).toBe(200);
    const allocation = response.body.allocation;
    expect(allocation).toHaveProperty("Stocks");
    expect(allocation).toHaveProperty("Bonds");
    expect(allocation).toHaveProperty("Real Estate");
    expect(allocation).toHaveProperty("Gold");
  });
});