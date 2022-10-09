import * as supertest from "supertest";
import { SuperAgentTest } from "supertest";
import { app } from "../../../src/main";
import JwtService from "../../../src/service/jwt";

describe("transaction routes", () => {
  let server: any;
  let request: SuperAgentTest;

  const baseUrl = "/transactions";
  const accessToken = JwtService.generateAccessToken(1, 1);

  beforeEach(() => {
    server = app.listen();
    request = supertest.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });

  describe("GET /:id", () => {
    test("should return 404 if transaction doesn't exist", async () => {
      const res = await request
        .get(`${baseUrl}/_cy7Vvsta`)
        .set("Authorization", `Bearer ${accessToken}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /", () => {
    test("should return all transactions", async () => {
      const res = await request
        .get(`${baseUrl}/`)
        .set("Authorization", `Bearer ${accessToken}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
