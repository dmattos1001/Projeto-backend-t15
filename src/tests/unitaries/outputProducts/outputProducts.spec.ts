import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";
import { mockedUserAdmNv3, mockerLoginAdmNv3, mockedProduct, mockedUserAdmNv2, mockerLoginAdmNv2, mockedUserAdmNv1, mockerLoginAdmNv1 } from './../../mocks/mock';

describe("/outputsProducts", () => {
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

    test("POST /outputsProducts - Creating a new outputsProducts ", async () => {
        const response = await request(app).post("/outputsProducts").send(mockedProduct)
        await request(app).post("/users").send(mockedUserAdmNv3)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("descriptio")
        expect(response.body).toHaveProperty("quantity")
        expect(response.body).toHaveProperty("outputdate")
        expect(response.body).toHaveProperty("userId")
        expect(response.body).toHaveProperty("productId")
        expect(response.status).toBe(201)        
    })

    test("POST /outputsProducts - Creating a new outputProducts with name already exists ", async () => {
        const response = await request(app).post("/outputsProducts").send(mockedProduct)
        await request(app).post("/users").send(mockedUserAdmNv3)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("placa de video")
        expect(response.body).toHaveProperty("descriptio")
        expect(response.body).toHaveProperty("quantity")
        expect(response.body).toHaveProperty("outputdate")
        expect(response.body).toHaveProperty("userId")
        expect(response.body).toHaveProperty("productId")
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)        
    })

    test("POST /outputsProducts - creating a outputs Products without being admin level three", async () => {
        const response = await request(app).post("/outputsProducts").send(mockedProduct)
        await request(app).post("/users").send(mockedUserAdmNv2)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv2);
        await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)        
    })

    test("GET /outputsProducts - list a outputs Products without being admin level two", async () => {
        await request(app).post("/outputsProducts").send(mockedProduct)
        await request(app).post("/users").send(mockedUserAdmNv1)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1);
        await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(adminLoginResponse.body).toHaveProperty("message")
        expect(adminLoginResponse.status).toBe(401)        
    })

    test("GET /outputsProducts - list a outputs Products", async () => {
        await request(app).post("/outputsProducts").send(mockedProduct)
        await request(app).post("/users").send(mockedUserAdmNv2)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv2);
        const response = await request(app).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)        
    })
    
    test("GET /outputsProducts/:id - looking for product output by id",async () => {
        await request(app).post("/users").send(mockedUserAdmNv2)
        const outputLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv2) 
        const output = await request(app).get("/outputsProducts")
        const response = await request(app).get(`/outputsProducts/${output.body[0].id}`).set("Authorization", `Bearer ${outputLoginResponse.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
             
    })

    test("GET /outputsProducts/:id - looking for product output by id without adm2",async () => {
        await request(app).post("/users").send(mockedUserAdmNv1)
        const outputLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1) 
        const output = await request(app).get("/outputsProducts")
        const response = await request(app).get(`/outputsProducts/${output.body[0].id}`).set("Authorization", `Bearer ${outputLoginResponse.body.token}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
        
             
    })
    
})
