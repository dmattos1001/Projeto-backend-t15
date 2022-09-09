import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUserAdmNv2,
  mockedUserAdmNv3,
  mockerLoginAdmNv2,
  mockerLoginAdmNv3,
} from "./../../mocks/mock";

describe("/user", () => {
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

  test("POST /user - Must be able to create a new user", async () => {
    const response = await request(app).post("/user").send(mockedUserAdmNv3);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("password");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body).toHaveProperty("administrationNivel");
    expect(response.body).toHaveProperty("occupation");
    expect(response.body).toHaveProperty("telephone");
    expect(response.body).toHaveProperty("cell");
    expect(response.body).toHaveProperty("address");
    expect(response.body.name).toEqual("hitalo");
    expect(response.body.email).toEqual("hitaloMenorLucas@gmail.com");
    expect(response.body.adress).toHaveProperty("discrict");
    expect(response.body.adress).toHaveProperty("zipCode");
    expect(response.body.adress).toHaveProperty("number");
    expect(response.body.adress).toHaveProperty("city");
    expect(response.body.adress).toHaveProperty("state");
    expect(response.body.adress.discrict).toEqual(
      "Rua Heleodo Pires de camargo"
    );
    expect(response.body.adress.zipCode).toEqual("72215093");
    expect(response.body.adress.number).toEqual("67");
    expect(response.body.adress.city).toEqual("Piedade");
    expect(response.body.adress.state).toEqual("SP");
    expect(response.status).toBe(201);
  });

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUserAdmNv3);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /users -  should be able to list all users", async () => {
    await request(app).post("/users").send(mockedUserAdmNv3);
    const admin3LoginResponse = await request(app)
      .post("/login")
      .send(mockerLoginAdmNv3);
    const adm3Response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admin3LoginResponse.body.token}`);

    expect(adm3Response.body).toHaveLength(1);
  });

  test("GET /users -  should not be able to list all users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /users -  should not be able to list users not being admin3", async () => {
    await request(app).post("/users").send(mockedUserAdmNv2);
    const admin2LoginResponse = await request(app)
      .post("/login")
      .send(mockerLoginAdmNv2);
    const adm2Response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);

    expect(adm2Response.body).toHaveLength(1);
  });

  test("GET /users/:id - looking for only one user adm 3", async () => {
    await request(app).post("/users").send(mockedUserAdmNv3);
    const admin3LoginResponse = await request(app)
      .post("/login")
      .send(mockerLoginAdmNv3);
    const userResponse = await request(app).get("/users");
    const response = await request(app)
      .get(`/users/${userResponse.body[0].id}`)
      .set("Authorization", `Bearer ${admin3LoginResponse.body.token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("password");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body).toHaveProperty("administrationNivel");
    expect(response.body).toHaveProperty("occupation");
    expect(response.body).toHaveProperty("telephone");
    expect(response.body).toHaveProperty("cell");
    expect(response.body).toHaveProperty("address");
    expect(response.body.adress).toHaveProperty("discrict");
    expect(response.body.adress).toHaveProperty("zipCode");
    expect(response.body.adress).toHaveProperty("number");
    expect(response.body.adress).toHaveProperty("city");
    expect(response.body.adress).toHaveProperty("state");
  });

  test("GET /users/:id -  listing a user with invalid id", async () => {
    const response = await request(app).get(
      `/users/33970640-5dbe-623a-9a5j-6c24b3794351`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
