import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";
import { mockedProvider, mockedProviderEqualCnpj, mockedUserAdmNv3, mockerLoginAdmNv3, mockedUserAdmNv1, mockerLoginAdmNv1, mockedUserAdmNv2, mockerLoginAdmNv2 } from './../../mocks/mock';
import createUserService from "../../../service/user/createUser.service";


describe("/provider", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    await createUserService(mockedUserAdmNv3);
    await createUserService(mockedUserAdmNv1);
    const administrationNivel3 = await request(app).post("/login").send(mockerLoginAdmNv3);
    await request(app).post("/provider").set("Authorization", `Bearer ${administrationNivel3.body.token}`)

    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /provider - Creating a new provider ",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).post("/provider").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProvider)

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("telephone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cnpj")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("employee")
        expect(response.body).toHaveProperty("employeeCell")
        expect(response.status).toBe(201)        
    })


    test("POST /provider -  shouldn't be able to create an equal cnpj already exists",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).post("/provider").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProviderEqualCnpj)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })

    test("POST /provider - creating a provider without being admin level three",async () =>{
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1);
        const response = await request(app).post("/provider").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
       
    })


    test("GET /provider -  should be able to list all providers adm",async () => {
        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const adm3Response = await request(app).get("/provider").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`)

        expect(adm3Response.status).toBe(200);
        expect(adm3Response.body).toHaveLength(1);
     
    })


    test("GET /provider -  should not be able to list providers without authentication",async () => {
        const response = await request(app).get("/provider")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /provider -  should not be able to list providers not being admin",async () => {
        const providerLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv2);
        await request(app).get("/provider")
        const response = await request(app).get("/provider").set("Authorization", `Bearer ${providerLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /provider/:id -  looking for only one provider adm",async () => {
        const providerLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3) 
        const provider = await request(app).get("/provider").set("Authorization", `Bearer ${providerLoginResponse.body.token}`)
        const response = await request(app).get(`/provider/${provider.body[0].id}`).set("Authorization", `Bearer ${providerLoginResponse.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("telephone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cnpj")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("employee")
        expect(response.body).toHaveProperty("employeeCell")
             
    })


    test("GET /provider/:id -  listing a provider with invalid id",async () => {
        const admLogin3 = await request(app).post("/login").send(mockerLoginAdmNv3) 
        const response = await request(app).get(`/provider/7703c6ff-0313-479d-b921-1f498af630b6`).set("Authorization", `Bearer ${admLogin3.body.token}`)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
        
    })
})