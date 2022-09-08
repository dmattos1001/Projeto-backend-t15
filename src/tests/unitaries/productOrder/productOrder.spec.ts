import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data.source";
import {
  mockedCategory,
  mockedProduct,
  mockedProductOrder,
  mockedProductOrderInvalidId,
  mockedProvider,
} from "../../mocks/mock";

describe("/productOrder", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });

    await request(app).post("/provider").send(mockedProvider);
    const responseProvider = await request(app).get("/provider");
    mockedProduct.provider = responseProvider.body[0].id;
    await request(app).post("/category").send(mockedCategory);
    const responseCategory = await request(app).get("/category");
    mockedProduct.category = responseCategory.body.id;
    await request(app).post("/product").send(mockedProduct);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /productOrder - consola loga", async () => {
    const proproduct = await request(app).get("/proproduct");
    mockedProductOrder.productId = proproduct.body[0].id;
    const response = await request(app)
      .post("/productOrder")
      .send(mockedProductOrder);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("quantityOfProducts");
    expect(response.body).toHaveProperty("requestDate");
    expect(response.status).toBe(200);
  });

  test("POST /productOrder ", async () => {
    const proproduct = await request(app).get("/proproduct");
    mockedProductOrder.productId = proproduct.body[0].id;
    const response = await request(app)
      .post("/productOrder")
      .send(mockedProductOrder);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("quantityOfProducts");
    expect(response.body).toHaveProperty("requestDate");
    expect(response.status).toBe(200);
  });

  test("POST /productOrder - should not be able to create productOrder that already exists", async () => {
    const proproduct = await request(app).get("/proproduct");
    mockedProductOrder.productId = proproduct.body[0].id;
    const response = await request(app)
      .post("/productOrder")
      .send(mockedProductOrder);
    expect(response).toHaveProperty("message");
    expect(response.body).toBe(400);
  });

  test("POST /productOrder - should not be able to create property with invalid categoryId ", async () => {
    const response = await request(app)
      .post("/productOrder")
      .send(mockedProductOrderInvalidId);
    expect(response).toHaveProperty("message");
    expect(response.body).toBe(404);
  });
  test("GET /productOrder", async () => {
    const response = await request(app).get("/productOrder");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });
  test("GET /productOrder/<id>", async () => {
    const productOrder = await request(app).get("/productOrder");
    const response = await request(app).get(
      `/productOrder/${productOrder.body[0].id}`
    );
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("quantityOfProducts");
    expect(response.body).toHaveProperty("requestDate");
    expect(response.status).toBe(200);
  });

  test("GET /productOrder/<id>", async () => {
    const response = await request(app).get(
      `/productOrder/9f8ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
