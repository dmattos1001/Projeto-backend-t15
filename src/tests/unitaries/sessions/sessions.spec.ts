import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";

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
  });
  afterAll(async () => {
    await connection.destroy();
  });
  test("POST /login", async () => {});
});
