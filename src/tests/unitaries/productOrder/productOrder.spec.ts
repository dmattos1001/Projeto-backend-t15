import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data.source";
import createUserService from "../../../service/user/createUser.service";
import {
  mockedCategory,
  mockedProduct,
  mockedProductOrder,
  mockedProvider,
  mockedUserAdmNv1,
  mockedUserAdmNv3,
  mockerLoginAdmNv1,
  mockerLoginAdmNv3,
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
    await createUserService(mockedUserAdmNv3);
    await createUserService(mockedUserAdmNv1);
    const administrationNivel = await request(app)
      .post("/login")
      .send(mockerLoginAdmNv3);
    await request(app)
      .post("/provider")
      .set("Authorization", `Bearer ${administrationNivel.body.token}`)
      .send(mockedProvider);

    await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${administrationNivel.body.token}`)
      .send(mockedCategory);

    const responseProvider = await request(app)
      .get("/provider")
      .set("Authorization", `Bearer ${administrationNivel.body.token}`);
    mockedProduct.provider = responseProvider.body[0].id;
    const responseCategory = await request(app)
      .get("/category")
      .set("Authorization", `Bearer ${administrationNivel.body.token}`);
    mockedProduct.category = responseCategory.body[0].id;
    await request(app)
      .post("/product")
      .set("Authorization", `Bearer ${administrationNivel.body.token}`)
      .send(mockedProduct);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /productOrder - Creating a order product", async () => {

    const login = await request(app).post("/login").send(mockerLoginAdmNv3);

    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;

    const response = await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("quantityOfProducts");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("requestDate");
    expect(response.status).toBe(201);

  });

  test("POST /productOrder - must not be able to create product Order does not have admin authorization ", async () => {
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    const response = await request(app)
      .post("/productOrder")
      .send(mockedProductOrder);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /productOrder - should not be able to create productOrder that already exists", async () => {
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    const response = await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /productOrder - should not be able to create property with invalid productId ", async () => {
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    mockedProductOrder.product = "dc1b0455-d388-4f22-a65e-9416b9ab3639";
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    const response = await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    console.log(response.body);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /productOrder - should not be able to create product Order has no token ", async () => {
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    const response = await request(app)
      .post("/productOrder")
      .send(mockedProductOrder);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /productOrder - must list all users ", async () => {
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    const response = await request(app)
      .get("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.body).toHaveProperty("productOrder");
    expect(response.body.productOrder[0]).toHaveProperty("name");
    expect(response.body.productOrder[0]).toHaveProperty("quantityOfProducts");
    expect(response.body.productOrder[0]).toHaveProperty("isActive");
    expect(response.body.productOrder[0]).toHaveProperty("requestDate");
    expect(response.body.productOrder[0]).toHaveProperty("user");
    expect(response.body.productOrder[0]).toHaveProperty("product");
    expect(response.status).toBe(200);
  });

  test("GET /productOrder - must not be able to list the product Order is not authorized by the administrator ", async () => {
    const loginNv1 = await request(app).post("/login").send(mockerLoginAdmNv1);
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    const response = await request(app)
      .get("/productOrder")
      .set("Authorization", `Bearer ${loginNv1.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /productOrder - must not be able to list the product order has no token ", async () => {
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    const response = await request(app).get("/productOrder");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /productOrder - must id list users ", async () => {
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    const id = await request(app)
      .get("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`);
    const response = await request(app)
      .get(`/productOrder/${id.body.productOrder[0].id}`)
      .set("Authorization", `Bearer ${login.body.token}`);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("quantityOfProducts");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("requestDate");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("product");
    expect(response.status).toBe(200);
  });
  test("GET /productOrder - must not be able to id list the product Order is not authorized by the administrator ", async () => {
    const loginNv1 = await request(app).post("/login").send(mockerLoginAdmNv1);
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    const id = await request(app)
      .get("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`);
    const response = await request(app)
      .get(`/productOrder/${id.body.productOrder[0].id}`)
      .set("Authorization", `Bearer ${loginNv1.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /productOrder - must not be able to id list the product order has no token ", async () => {
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    const id = await request(app)
      .get("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`);
    const response = await request(app).get(
      `/productOrder/${id.body.productOrder[0].id}`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
  test("GET /productOrder - should not be able to list the product orden id with the wrong product id ", async () => {
    const login = await request(app).post("/login").send(mockerLoginAdmNv3);
    const product = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.product = product.body[0].id;
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${login.body.token}`);
    mockedProductOrder.user = userId.body[0].id;
    await request(app)
      .post("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedProductOrder);
    const id = await request(app)
      .get("/productOrder")
      .set("Authorization", `Bearer ${login.body.token}`);
    const response = await request(app)
      .get(`/productOrder/${"ac2426e5-37fa-4d67-bf4a-9ecdfd2f2f18"}`)
      .set("Authorization", `Bearer ${login.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
