import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";
import { mockedProvider, mockedProviderEqualCnpj } from './../../mocks/mock';


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
        const response = await request(app).post("/provider").send(mockedProvider)

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
        const response = await request(app).post("/provider").send(mockedProviderEqualCnpj)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })

    test("GET /provider -  should be able to list all providers",async () => {
        await request(app).post("/provider").send()
        // const response = await request(app).get("/provider").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const response = await request(app).get("/provider").send(mockedProvider)
        expect(response.body).toHaveLength(1)
     
    })

    // test("GET /provider -  should not be able to list providers without authentication",async () => {
    //     const response = await request(app).get("/provider")

    //     expect(response.body).toHaveProperty("message")
    //     expect(response.status).toBe(401)
             
    // })

    // test("GET /provider -  should not be able to list providers not being admin2",async () => {
    //     const providerLoginResponse = await request(app).post("/login").send(mockedProvider);
    //     const response = await request(app).get("/provider").set("Authorization", `Bearer ${providerLoginResponse.body.token}`)

    //     expect(response.body).toHaveProperty("message")
    //     expect(response.status).toBe(403)
             
    // })

    test("GET /provider/:id -  looking for only one provider",async () => {

        const provider = await request(app).get("/provider")
        const response = await request(app).get(`/provider/${provider.body[0].id}`)
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
      
        const response = await request(app).get(`/provider/33970640-5dbe-623a-9a5j-6c24b3794351`)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
        
    })
})