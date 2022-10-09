import * as supertest from "supertest";
import { SuperAgentTest } from "supertest";
import { faker } from "@faker-js/faker";
import { app } from "../../../src/main";
import Helper from "../../index";
import { Data } from "../../../src/interface";

describe("wallet routes", () => {
  let server: any;
  let request: SuperAgentTest;
  let accessToken: string;

  const baseUrl = "/wallet";

  beforeEach(async () => {
    accessToken = await Helper.getFundedAccount();
    server = app.listen();
    request = supertest.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });

  describe("GET /", () => {
    test("should return wallet details", async () => {
      const res = await request
        .get(`${baseUrl}`)
        .set("Authorization", `Bearer ${accessToken}`);
      const data = res.body.data;
      expect(res.statusCode).toBe(200);
      expect(data).toHaveProperty("balance");
    });
  });

  describe("POST /fund", () => {
    const exec = async (payload: Data) => {
      const { token } = await Helper.getDetails();
      accessToken = token;
      return request
        .post(`${baseUrl}/fund`)
        .send(payload)
        .set("Authorization", `Bearer ${accessToken}`);
    };

    test("should return checkout url to fund wallet", async () => {
      const payload = { amount: 3000 };
      const res = await exec(payload);
      const data = res.body.data;
      expect(res.statusCode).toBe(200);
      expect(data).toHaveProperty("checkoutUrl");
    });

    test("should return 400 if validation fails", async () => {
      const res = await exec({});
      const data = res.body.data;
      expect(res.statusCode).toBe(400);
      expect(data).toBeNull();
    });
  });

  describe("POST /transfer", () => {
    const exec = (payload: Data) => {
      return request
        .post(`${baseUrl}/transfer`)
        .send(payload)
        .set("Authorization", `Bearer ${accessToken}`);
    };

    test("should process transfer", async () => {
      const payload = { amount: 5000, username: "victor" };
      const res = await exec(payload);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("transfer is being processed");
    });

    test("insufficient balance", async () => {
      const payload = { amount: 50000, username: "victor" };
      const res = await exec(payload);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("insufficient balance");
    });

    test("should return 400 if validation fails", async () => {
      const res = await exec({});
      const data = res.body.data;
      expect(res.statusCode).toBe(400);
      expect(data).toBeNull();
    });
  });

  describe("POST /withdraw", () => {
    const payload = {
      name: faker.name.fullName(),
      amount: 5000,
      account: "2000737698",
      bank: "Kuda Bank",
    };

    const exec = (payload: Data) => {
      return request
        .post(`${baseUrl}/withdraw`)
        .send(payload)
        .set("Authorization", `Bearer ${accessToken}`);
    };

    test("should process transfer", async () => {
      const res = await exec(payload);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("withdrawal is being processed");
    });

    test("insufficient balance", async () => {
      payload.amount = 50000;
      const res = await exec(payload);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("insufficient balance");
    });

    test("should return 400 if validation fails", async () => {
      const res = await exec({});
      const data = res.body.data;
      expect(res.statusCode).toBe(400);
      expect(data).toBeNull();
    });
  });
});
