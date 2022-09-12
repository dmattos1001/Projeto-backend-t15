import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUserAdmNv1,
  mockedUserAdmNv2,
  mockedUserAdmNv3,
  mockerLoginAdmNv3,
} from "../../mocks/mock";
import createUserService from "./../../../service/user/createUser.service";

describe("/login", () => {
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
    await createUserService(mockedUserAdmNv2);
    await createUserService(mockedUserAdmNv1);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockerLoginAdmNv3);

    expect(adminLoginResponse.body).toHaveProperty("token");
    expect(adminLoginResponse.status).toBe(200);
  });

  test("POST /login -  should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post("/login").send({
      email: "06053245600",
      password: "3600",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
