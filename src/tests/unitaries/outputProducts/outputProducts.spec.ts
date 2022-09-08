import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";
import { mockedUserAdmNv3, mockerLoginAdmNv3} from './../../mocks/mock';

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
        const response = await request(app).post("/outputsProducts").send("")
        await request(app).post("/users").send(mockedUserAdmNv3)
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        await request(app).post("/provider").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("descriptio")
        expect(response.body).toHaveProperty("quantity")
        expect(response.body).toHaveProperty("outputdate")
        expect(response.body).toHaveProperty("userId")
        expect(response.body).toHaveProperty("productId")
        expect(response.status).toBe(201)        
    })
})
