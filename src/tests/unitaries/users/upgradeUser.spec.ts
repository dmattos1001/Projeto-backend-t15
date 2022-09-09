import updatedUserService from "../../../service/user/updateUser.service";
import {DataSource} from "typeorm"
import AppDataSource from "../../../data.source"
import { mockedUserAdmNv1, mockedUserAdmNv3, mockerLoginAdmNv1, mockerLoginAdmNv3 } from "../../mocks/mock";
import app from "../../../app";
import request from  "supertest"

describe("Soft Delete an user", ()=>{
  let connection: DataSource

  beforeAll(async ()=>{
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("PATCH /users/:id")
})