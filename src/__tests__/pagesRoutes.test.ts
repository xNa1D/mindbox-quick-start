import supertest from "supertest";
import { getByText, queryByText, screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import generateAccessToken from "../server/helpers/generateAccessToken";
import { JSDOM } from "jsdom";

import { server } from "../server/index";

let agent: supertest.SuperTest<supertest.Test>;

jest.mock("../server/models/Scenarios.ts");

beforeAll(() => {
  agent = supertest(server);
});

afterAll(() => {
  server.close();
});

const token = generateAccessToken("nikitin@mindbox.ru");

describe("index page", () => {
  // it("should return scenario page if jwt is ok", async () => {
  //   const result = await agent
  //     .get("/")
  //     .set("Cookie", [`token=${token}`])
  //     .send();

  //   expect(result.status).toBe(302);
  //   expect(result.header["location"]).toBe("/scenario");
  // });

  it("should return index page if jwt is not ok", async () => {
    const result = await agent.get("/").set("Cookie", [`token=123`]).send();

    expect(result.status).toBe(200);
  });
});

describe("scenario page", () => {
  it("should return scenario page if jwt is ok", async () => {
    const result = await agent
      .get("/scenario")
      .set("Cookie", [`token=${token}`])
      .send();

    expect(result.status).toBe(200);
  });

  it("should return index page if jwt is not ok", async () => {
    const result = await agent
      .get("/scenario")
      .set("Cookie", [`token=123`])
      .send();

    expect(result.status).toBe(302);
    expect(result.header["location"]).toBe("/");
  });
});

describe("registration page", () => {
  it("should return registration page if jwt is ok", async () => {
    const result = await agent
      .get("/registration")
      .set("Cookie", [`token=${token}`])
      .send();

    const page = new JSDOM(result.text);

    expect(page.window.document.title).toBe(
      "Mindbox Quick Start - Регистрация"
    );
  });
});
