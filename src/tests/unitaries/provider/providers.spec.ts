import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";
import { mockedProvider, mockedProviderEqualCnpj, mockedUserAdmNv3, mockerLoginAdmNv3, mockedUserAdmNv1, mockerLoginAdmNv1, mockedUserAdmNv2, mockerLoginAdmNv2 } from './../../mocks/mock';


describe("/provider", () => {
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

    test("POST /provider - Creating a new provider ",async () => {
        await request(app).post("/users").send(mockerLoginAdmNv3)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).post("/provider").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("telephone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cnpj")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("employee")
        expect(response.body).toHaveProperty("employeeCell")
        expect(response.body.name).toEqual("Megabyte")
        expect(response.body.email).toEqual("megaByte@mail.com")
        expect(response.status).toBe(201)        
    })


    test("POST /provider -  shouldn't be able to create an equal cnpj already exists",async () => {
        await request(app).post("/users").send(mockerLoginAdmNv3)
        await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).post("/provider").send(mockedProviderEqualCnpj)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })

    test("POST /provider - creating a provider without being admin level three",async () =>{
        await request(app).post("/users").send(mockedUserAdmNv1)
        const adm1LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1);
        const responseAdm1 = await request(app).post("/provider").set("Authorization", `Bearer ${adm1LoginResponse.body.token}`)
        
        expect(responseAdm1.body).toHaveProperty("message")
        expect(responseAdm1.status).toBe(403)
       
    })

    test("POST /provider - creating a provider without being admin level three",async () =>{
        await request(app).post("/users").send(mockedUserAdmNv2)
        const adm2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv2);
        const responseAdm2 = await request(app).post("/provider").set("Authorization", `Bearer ${adm2LoginResponse.body.token}`)

        expect(responseAdm2.body).toHaveProperty("message")
        expect(responseAdm2.status).toBe(403)
    })

    test("GET /provider -  should be able to list all providers adm2",async () => {
        await request(app).post("/users").send(mockedUserAdmNv2)
        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv2);
        const adm2Response = await request(app).get("/provider").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`)

        expect(adm2Response.body).toHaveLength(1)
     
    })

    test("GET /provider -  should be able to list all providers adm3",async () => {
        await request(app).post("/users").send(mockedUserAdmNv3)
        const admin3LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const adm3Response = await request(app).get("/provider").set("Authorization", `Bearer ${admin3LoginResponse.body.token}`)

        expect(adm3Response.body).toHaveLength(1)
     
    })


    test("GET /provider -  should not be able to list providers without authentication",async () => {
        const response = await request(app).get("/provider")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /provider -  should not be able to list providers not being admin 2 or 3",async () => {
        await request(app).post("/users").send(mockedUserAdmNv1)
        const providerLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1);
        const response = await request(app).get("/provider").set("Authorization", `Bearer ${providerLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("GET /provider/:id -  looking for only one provider adm2",async () => {
        await request(app).post("/users").send(mockedUserAdmNv2)
        const providerLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv2) 
        const provider = await request(app).get("/provider")
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

    test("GET /provider/:id -  looking for only one provider adm3",async () => {
        await request(app).post("/users").send(mockedUserAdmNv3)
        const providerLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3) 
        const provider = await request(app).get("/provider")
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

    test("GET /provider/:id -  accessing the route without being admin",async () => {
        await request(app).post("/users").send(mockedUserAdmNv1)
        const providerLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1) 
        const provider = await request(app).get("/provider")
        const response = await request(app).get(`/provider/${provider.body[0].id}`).set("Authorization", `Bearer ${providerLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })


    test("GET /provider/:id -  listing a provider with invalid id",async () => {
      
        const response = await request(app).get(`/provider/33970640-5dbe-623a-9a5j-6c24b3794351`)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
        
    })
})