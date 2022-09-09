import deleteUserService from "../../../service/user/deleteUser.service";
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

  test("DELETE /users/:id - Shouldn't be able to delete user without authentication", async ()=>{
    await request(app).post('/users').send(mockedUserAdmNv3)
    const admLoginResp = await request(app).post('/login').send(mockerLoginAdmNv3)
    const userToDelete = await request(app).get('/users').set("Authorization", `Bearer ${admLoginResp.body.token}`)
    
    const response = await request(app).delete(`/users/${userToDelete.body[0].id}`)
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })  
  test("DELETE /users/:id - Shouldn't be able to delete user without permission", async ()=>{
    const withoutPermissionLoginResp = await request(app).post('/login').send(mockerLoginAdmNv1)
    const withPermissionLoginResp = await request(app).post('/login').send(mockerLoginAdmNv3)
    const userToDelete = await request(app).get('/users').set("Authorization", `Bearer ${withPermissionLoginResp.body.token}`)
    
    const response = await request(app).delete(`/users/${userToDelete.body[0].id}`).set("Authorization", `Bearer ${withoutPermissionLoginResp.body.token}`)
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })
  test ("DELETE /users/:id - Must be able to soft delete user", async ()=>{
    const withPermissionLoginResp = await request(app).post('/login').send(mockerLoginAdmNv3)
    const userToDelete = await request(app).get('/users').set("Authorization", `Bearer ${withPermissionLoginResp.body.token}`)
    
    const response = await request(app).delete(`/users/${userToDelete.body[0].id}`).set("Authorization", `Bearer ${withPermissionLoginResp.body.token}`)
    const findUser = await request(app).get("/users").set("Authorization", `Bearer ${withPermissionLoginResp.body.token}`)

    expect(response.status).toBe(200)
    expect(findUser.body[0].isActive).toBe(false)
  })
  test ("DELETE /users/:id - Shouldn't be able to delete user with 'isActive = false' ", async ()=>{
    const withPermissionLoginResp = await request(app).post('/login').send(mockerLoginAdmNv3)
    const userToDelete = await request(app).get('/users').set("Authorization", `Bearer ${withPermissionLoginResp.body.token}`)

    const response = await request(app).delete(`/users/${userToDelete.body[0].id}`).set("Authorization", `Bearer ${withPermissionLoginResp.body.token}`)
    expect(response.status).toBe(400)
    expect(userToDelete.body[0].isActive).toBe(false)
  })
  test("DELETE /users/:id -  shouldn't be able to delete user with invalid id",async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
    const userToDelete = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
})
})