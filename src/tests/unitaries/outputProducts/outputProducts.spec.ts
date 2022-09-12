import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUserAdmNv3,
  mockerLoginAdmNv3,
  mockedProduct,
  mockedUserAdmNv2,
  mockerLoginAdmNv2,
  mockedUserAdmNv1,
  mockerLoginAdmNv1,
  mockedOutputProduct,
  mockedProvider,
  mockedCategory,
  mockedProductOrder,
} from "./../../mocks/mock";
import createUserService from "../../../service/user/createUser.service";

describe("/outputsProducts", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
      await createUserService(mockedUserAdmNv3);
      await createUserService(mockedUserAdmNv1);
      const administrationNivel3 = await request(app).post("/login").send(mockerLoginAdmNv3);

      await request(app)
      .post("/provider")
      .set("Authorization", `Bearer ${administrationNivel3.body.token}`)
      .send(mockedProvider);

    await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${administrationNivel3.body.token}`)
      .send(mockedCategory);

    const responseProvider = await request(app)
      .get("/provider")
      .set("Authorization", `Bearer ${administrationNivel3.body.token}`);
    mockedProduct.provider = responseProvider.body[0].id;
    const responseCategory = await request(app)
      .get("/category")
      .set("Authorization", `Bearer ${administrationNivel3.body.token}`);
    mockedProduct.category = responseCategory.body[0].id;
    await request(app)
      .post("/product")
      .set("Authorization", `Bearer ${administrationNivel3.body.token}`)
      .send(mockedProduct);
   
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /outputsProducts - Creating a new outputsProducts ", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app).get("/product").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    mockedOutputProduct.productId = product.body[0].id
    const response = await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedOutputProduct)

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("descriptio");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("productId");
    expect(response.status).toBe(201);
  });

  test("POST /outputsProducts - Creating a new outputProducts with name already exists ", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app).get("/product").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    mockedOutputProduct.productId = product.body[0].id
    await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedOutputProduct)
    const response = await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedOutputProduct)

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /outputsProducts - creating a outputs Products without being admin level three", async () => {
    const response = await request(app).post("/outputsProducts").send(mockedProduct);
    await request(app).post("/users").send(mockedUserAdmNv2);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockerLoginAdmNv2);
    await request(app)
      .post("/outputsProducts")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /outputsProducts - list a outputs Products without being admin level two", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1);
    const response = await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /outputsProducts - list a outputs Products", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app).get("/product").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
   
    mockedOutputProduct.productId = product.body[0].id
    await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).get("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /outputsProducts/:id - looking for product output by id", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app).get("/product").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
   
    mockedOutputProduct.productId = product.body[0].id
    await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const responseId = await request(app).get("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).get(`/outputsProducts/${responseId.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("descriptio");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("product");
    expect(response.status).toBe(200);
    
  });

  test("GET /outputsProducts/:id - listing id product invalid", async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app).get("/product").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
   
    mockedOutputProduct.productId = product.body[0].id
    await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).get(`/outputsProducts/7703c6ff-0313-479d-b921-1f498af630b6`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
