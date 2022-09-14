import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";

import { mockedUserAdmNv2, mockedUserAdmNv3, mockerLoginAdmNv3, mockedUserAdmNv1, mockerLoginAdmNv1, mockedUserAdmNv3CpfInvalid, mockerLoginAdmNv2 } from './../../mocks/mock';

import createUserService from './../../../service/user/createUser.service';


describe("/users", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
        await createUserService(mockedUserAdmNv3);
        await createUserService(mockedUserAdmNv2);
        await createUserService(mockedUserAdmNv1);

    })

    afterAll(async() => {
        await connection.destroy()
    })
    test("POST /users - Creating a new user ",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      

        expect(response.body[0]).toHaveProperty("name")
        expect(response.body[0]).toHaveProperty("cpf")
        expect(response.body[0]).toHaveProperty("email")
        expect(response.body[0]).toHaveProperty("password")
        expect(response.body[0]).toHaveProperty("administrationNivel")
        expect(response.body[0]).toHaveProperty("occupation")
        expect(response.body[0]).toHaveProperty("telephone")
        expect(response.body[0]).toHaveProperty("cell")
        expect(response.body[0]).toHaveProperty("address")
        expect(response.body[0].address).toHaveProperty("district")
        expect(response.body[0].address).toHaveProperty("zipCode")
        expect(response.body[0].address).toHaveProperty("number")
        expect(response.body[0].address).toHaveProperty("city")
        expect(response.body[0].address).toHaveProperty("state")
        expect(response.status).toBe(200)        
    })


    test("POST /users -  creating a user with the same cpf",async () => {

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).post("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedUserAdmNv3CpfInvalid)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)      
    })

    test("GET /users -  Must be able to list users",async () => {
        await request(app).post("/users").send(mockedUserAdmNv3)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body[0]).toHaveProperty("name")
        expect(response.body[0]).toHaveProperty("cpf")
        expect(response.body[0]).toHaveProperty("email")
        expect(response.body[0]).toHaveProperty("password")
        expect(response.body[0]).toHaveProperty("administrationNivel")
        expect(response.body[0]).toHaveProperty("occupation")
        expect(response.body[0]).toHaveProperty("telephone")
        expect(response.body[0]).toHaveProperty("cell")
        expect(response.body[0]).toHaveProperty("address")
        expect(response.body[0].address).toHaveProperty("district")
        expect(response.body[0].address).toHaveProperty("zipCode")
        expect(response.body[0].address).toHaveProperty("number")
        expect(response.body[0].address).toHaveProperty("city")
        expect(response.body[0].address).toHaveProperty("state")
        expect(response.status).toBe(200)   

     
    })

    test("GET /users -  should not be able to list users without authentication",async () => {
        const response = await request(app).get("/users")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /users -  should not be able to list users not being admin three",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserAdmNv1);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
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

    test("DELETE /users/:id -  deactivating a user whithout adm 3",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdmNv2);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })
    
    test("DELETE /users/:id -  should not be able to delete user with invalid id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        
        const response = await request(app).delete(`/users/33933660-5dbe-453a-9a9d-5c73b31943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
     
    })

   test("DELETE /users/:id -  deactivating a user",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const userDesatived = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userDesatived.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(204)
        expect(findUser.body[0].isActive).toBe(false)
     
    });  
    
    test("DELETE /users/:id - deactivating an already deactivated user",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const userDeactivating = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userDeactivating.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
     
    })

    test("PATCH /users/:id - trying to update a user", async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const userPatch = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const response = await request(app).patch(`/users/${userPatch.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.status).toEqual(201)
        expect(response.body).toEqual(expect.objectContaining({
            name: response.body.name,
            cpf: response.body.cpf,
            email: response.body.email,
            password: response.body.password,
            administrationNivel: response.body.administrationNivel,
            occupation: response.body.occupation,
            telephone: response.body.telephone,
            cell: response.body.cell,
            address:{
            id: response.body.address.id,
            district: response.body.address.district,
            zipCode: response.body.address.zipCode,
            number: response.body.address.number,
            city: response.body.address.city,
            state: response.body.address.state, 
            },
    }))
        
      });

      test("PATCH /users/:id - trying to update a user that does not exist", async () => {
        await request(app).post("/users").send(mockerLoginAdmNv3)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).patch(`/users/33933660-5dbe-453a-9a9d-5c73b31943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
      });
    
})
