import * as supertest from "supertest";
import { SuperAgentTest } from "supertest";
import { app } from "../../../src/main";
import { faker } from "@faker-js/faker";
import { Data } from "../../../src/interface";

describe("auth routes", () => {
  let server: any;
  let request: SuperAgentTest;

  const baseUrl = "/auth";
  const payload = {
    username: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  beforeEach(() => {
    server = app.listen();
    request = supertest.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });

  describe("POST /register", () => {
    const exec = (payload: Data) => {
      return request.post(`${baseUrl}/register`).send(payload);
    };

    test("should register user", async () => {
      const res = await exec(payload);
      expect(res.statusCode).toBe(201);
    });

    test("should return 400 if validation fails", async () => {
      const { password, ...des } = payload;
      const newPayload = { ...des, password: faker.internet.password(4) };
      const res = await exec(newPayload);
      const data = res.body.data;
      expect(res.statusCode).toBe(400);
      expect(data).toBeNull();
    });
  });

  describe("POST /login", () => {
    const { username, ...newPayload } = payload;
    const exec = (payload: Data) => {
      return request.post(`${baseUrl}/login`).send(payload);
    };

    test("should return access token if user exists", async () => {
      const res = await exec(newPayload);
      const accessToken = res.body.data.accessToken;
      expect(res.statusCode).toBe(200);
      expect(accessToken).not.toBeNull();
    });

    test("should return 400 if validation fails", async () => {
      newPayload.password = "testing";
      const res = await exec(newPayload);
      const data = res.body.data;
      expect(res.statusCode).toBe(400);
      expect(data).toBeNull();
    });
  });
});
