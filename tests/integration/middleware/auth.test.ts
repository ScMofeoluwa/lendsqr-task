import * as supertest from "supertest";
import { SuperAgentTest } from "supertest";
import { app } from "../../../src/main";
import Helper from "../../index";

describe("auth middleware", () => {
  let accessToken: string;
  let server: any;
  let request: SuperAgentTest;

  beforeEach(async () => {
    const { token } = await Helper.getDetails();
    accessToken = token;
    server = app.listen();
    request = supertest.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });

  const exec = () => {
    return request.get("/wallet").set("Authorization", `Bearer ${accessToken}`);
  };

  test("should return 401 if no token is provided", async () => {
    accessToken = "";
    const res = await exec();
    expect(res.statusCode).toBe(401);
  });

  test("should return 400 if token is invalid", async () => {
    accessToken = "trial";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  test("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
