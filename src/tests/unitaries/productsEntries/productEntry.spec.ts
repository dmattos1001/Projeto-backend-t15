import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data.source";
import {
  mockedProductEntry,
  mockedProductEntryInvalid,
} from "../../mocks/mock";

describe("/productentry", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /productentry - Registering product entry", async () => {
    const adminLoginResponse = await request(app).post("/login").send(); //mockedLogin
    const response = await request(app)
      .post("/productentry")
      .send(mockedProductEntry)
      .set("Authorizarion", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("productsId");
    expect(response.body).toHaveProperty("providerId");
    expect(response.body.name).toEqual("RTX 3080");
    expect(response.body.quantity).toEqual(15);
    expect(response.status).toBe(201);
  });

  test("POST /productentry -  should not post a product that doesnt exists", async () => {
    const adminLoginResponse = await request(app).post("/login").send(); //mockedLogin

    await request(app)
      .post("/productentry")
      .send(mockedProductEntryInvalid)
      .set("Authorizarion", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .post("/productentry")
      .send(mockedProductEntryInvalid)
      .set("Authorizarion", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /productentry -  should not be able to entry a product without authorization", async () => {
    const adminLoginResponse = await request(app).post("/login").send(); //mockedLogin
    const response = await request(app)
      .post("/productentry")
      .send(mockedProductEntry)
      .set("Authorizarion", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /productentry -  should be able to list all product entries", async () => {
    const adminLoginResponse = await request(app).post("/login").send(); //mockedLogin
    const response = await request(app)
      .get("/productentry")
      .set("Authorizarion", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
  });

  test("GET /productentry - should not be able to list product entries without authorization", async () => {
    const response = await request(app).get("/productentry");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /productentry/:id - should be able to list a product entry", async () => {
    const adminLoginResponse = await request(app).post("/login").send(); //mockedLogin
    const product = await request(app)
      .post("/productentry")
      .set("Authorizarion", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedProductEntry);

    const response = await request(app)
      .get(`/productentry/${product.body.id}`)
      .set("Authorizarion", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("productsId");
    expect(response.body).toHaveProperty("providerId");
    expect(response.body.name).toEqual("RTX 3080");
    expect(response.body.quantity).toEqual(15);
    expect(response.status).toBe(200);
  });

  test("GET /productentry/:id - should not be able to list a product entry without authorization", async () => {
    const adminLoginResponse = await request(app).post("/login").send(); //mockedLogin
    const product = await request(app)
      .post("/productentry")
      .set("Authorizarion", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedProductEntry);

    const response = await request(app).get(`/productentry/${product.body.id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
