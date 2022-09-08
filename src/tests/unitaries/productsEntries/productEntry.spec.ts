import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data.source";
import {
  mockedProductEntry,
  mockedProductEntryInvalid,
  mockedProvider,
  mockedUserAdmNv2,
  mockedUserAdmNv3,
  mockerLoginAdmNv2,
  mockerLoginAdmNv3,
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

    await request(app).post("/users").send(mockedUserAdmNv3);
    await request(app).post("/users").send(mockedUserAdmNv2);
    const adminLvl3 = await request(app).post("/login").send(mockerLoginAdmNv3);
    await request(app)
      .post("/product")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`)
      .send(); //mocked product
    await request(app)
      .post("/provider")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`)
      .send(mockedProvider);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /productentry - Registering product entry", async () => {
    const adminLvl3 = await request(app).post("/login").send(mockerLoginAdmNv3);
    const products = await request(app)
      .get("/product")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
    const providers = await request(app)
      .get("/provider")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
    mockedProductEntry.userId = adminLvl3.body.id;
    mockedProductEntry.productsId = products.body[0].id;
    mockedProductEntry.providerId = providers.body[0].id;
    const response = await request(app)
      .post("/productentry")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`)
      .send(mockedProductEntry);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("productsId");
    expect(response.body).toHaveProperty("providerId");
    expect(response.body.name).toEqual("RTX 3080");
    expect(response.body.quantity).toEqual(15);
    expect(response.status).toBe(201);
  });

  test("POST /productentry -  should not post a product that doesnt exist", async () => {
    const adminLvl3 = await request(app).post("/login").send(mockerLoginAdmNv3);

    const response = await request(app)
      .post("/productentry")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`)
      .send(mockedProductEntryInvalid);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /productentry -  should not be able to entry a product without authorization", async () => {
    const response = await request(app)
      .post("/productentry")
      .send(mockedProductEntry);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /productentry -  should be able to list all product entries", async () => {
    const adminLvl3 = await request(app).post("/login").send(mockerLoginAdmNv3);

    const response = await request(app)
      .get("/productentry")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);

    expect(response.body).toHaveLength(1);
  });

  test("GET /productentry - should not be able to list product entries without authorization", async () => {
    const response = await request(app).get("/productentry");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /productentry/:id - should be able to list a product entry", async () => {
    const adminLvl3 = await request(app).post("/login").send(mockerLoginAdmNv3);
    const products = await request(app)
      .get("/product")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
    const providers = await request(app)
      .get("/provider")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
    mockedProductEntry.userId = adminLvl3.body.id;
    mockedProductEntry.productsId = products.body[0].id;
    mockedProductEntry.providerId = providers.body[0].id;
    const productEntries = await request(app)
      .get("/productentry")
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);

    const response = await request(app)
      .get(`/productentry/${productEntries.body[0].id}`)
      .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("productsId");
    expect(response.body).toHaveProperty("providerId");
    expect(response.body.name).toEqual(mockedProductEntry.name);
    expect(response.body.quantity).toEqual(15);
    expect(response.status).toBe(200);
  });

  test("GET /productentry/:id - should not be able to list a product entry without authorization", async () => {
    const product = await request(app)
      .post("/productentry")
      .send(mockedProductEntry);

    const response = await request(app).get(`/productentry/${product.body.id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
