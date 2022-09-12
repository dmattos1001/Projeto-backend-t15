import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";
import { mockedUserAdmNv2, mockedUserAdmNv3, mockerLoginAdmNv3, mockerLoginAdmNv2, mockerLoginAdmNv1 } from './../../mocks/mock';


describe("/users", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /users - Creating a new user ",async () => {
        const response = await request(app).post("/users").send(mockedUserAdmNv3)

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("cpf")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("password")
        expect(response.body).toHaveProperty("administrationNivel")
        expect(response.body).toHaveProperty("occupation")
        expect(response.body).toHaveProperty("telephone")
        expect(response.body).toHaveProperty("cell")
        expect(response.body).toHaveProperty("address")
        expect(response.body.address).toHaveProperty("district")
        expect(response.body.address).toHaveProperty("zipCode")
        expect(response.body.address).toHaveProperty("number")
        expect(response.body.address).toHaveProperty("city")
        expect(response.body.address).toHaveProperty("state")
        expect(response.status).toBe(201)        
    })


    test("POST /users -  creating a user with the same cpf",async () => {
        const response = await request(app).post("/users").send(mockedUserAdmNv3)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)      
    })

    test("GET /users -  Must be able to list users",async () => {
        await request(app).post("/users").send(mockedUserAdmNv3)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.body).toHaveLength(1)

     
    })

    test("GET /users -  should not be able to list users without authentication",async () => {
        const response = await request(app).get("/users")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /users -  should not be able to list users not being admin three",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserAdmNv2);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })


    test("GET /users/:id -  listing only id user",async () => {
        await request(app).post("/users").send(mockerLoginAdmNv3)

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const listId = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).get(`/users/${listId.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
       
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("cpf")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("password")
        expect(response.body).toHaveProperty("administrationNivel")
        expect(response.body).toHaveProperty("occupation")
        expect(response.body).toHaveProperty("telephone")
        expect(response.body).toHaveProperty("cell")
        expect(response.body).toHaveProperty("address")
        expect(response.body.address).toHaveProperty("district")
        expect(response.body.address).toHaveProperty("zipCode")
        expect(response.body.address).toHaveProperty("number")
        expect(response.body.address).toHaveProperty("city")
        expect(response.body.address).toHaveProperty("state")  
     
    })

    test("DELETE /users/:id -  deactivating a user",async () => {
        await request(app).post("/users").send(mockerLoginAdmNv3)

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const userDesatived = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userDesatived.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(204)
        expect(findUser.body[0].isActive).toBe(false)
     
    })


    test("DELETE /users/:id -  deactivating a user whithout adm 3",async () => {
        await request(app).post("/users").send(mockerLoginAdmNv2)

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv2);
        const userDesatived = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userDesatived.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toHaveProperty("message")
        expect(response.status).toBe(400)
    })
    


    test("DELETE /users/:id - deactivating an already deactivated user",async () => {
        await request(app).post("/users").send(mockerLoginAdmNv3)

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const userDeactivating = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userDeactivating.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

    test("DELETE /users/:id -  should not be able to delete user with invalid id",async () => {
        await request(app).post("/users").send(mockerLoginAdmNv3)

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        
        const response = await request(app).delete(`/users/33933660-5dbe-453a-9a9d-5c73b31943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

    test("PATCH /users/:id - trying to update a user", async () => {
        await request(app).post("/users").send(mockerLoginAdmNv3)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const userPatch = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const response = await request(app).patch(`/users/${userPatch.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.status).toEqual(201)
        expect(userPatch.body).toEqual(expect.objectContaining({
            name: userPatch.body.name,
            cpf: userPatch.body.cpf,
            email: userPatch.body.email,
            password: userPatch.body.password,
            administrationNivel: userPatch.body.administrationNivel,
            occupation: userPatch.body.occupation,
            telephone: userPatch.body.telephone,
            cell: userPatch.body.cell,
            address: userPatch.body.address,
            district: userPatch.body.address.district,
            zipCode: userPatch.body.address.zipCode,
            number: userPatch.body.address.number,
            city: userPatch.body.address.city,
            state: userPatch.body.address.state, 
          }) )
          
      });

      test("PATCH /users/:id - trying to update a user that does not exist", async () => {
        await request(app).post("/users").send(mockerLoginAdmNv3)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).patch(`/users/33933660-5dbe-453a-9a9d-5c73b31943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        

        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("message")
      });
    
})
