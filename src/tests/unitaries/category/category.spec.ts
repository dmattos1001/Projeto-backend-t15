import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";
import { mockedCategory, mockedUserAdmNv1, mockedUserAdmNv2, mockerLoginAdmNv1, mockerLoginAdmNv2 } from "../../mocks/mock";

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

    test("POST /category - Creating a new category adm2",async () => {

        const response = await request(app).post("/category").send(mockedCategory);
        await request(app).post("/users").send(mockedUserAdmNv2);
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdmNv2);
        await request(app).post("/category").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
        expect(response.status).toBe(201); 

    });

    test("POST /category -  shouldn't be able to create an equal name already exists",async () => {
        const response = await request(app).post("/category").send(mockedCategory);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
             
    });

    test("POST /category - creating a category without being admin level adm2",async () =>{
        await request(app).post("/users").send(mockedUserAdmNv1)
        const adm1LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1);
        const responseAdm1 = await request(app).post("/category").set("Authorization", `Bearer ${adm1LoginResponse.body.token}`);
        
        expect(responseAdm1.body).toHaveProperty("message");
        expect(responseAdm1.status).toBe(403);
       
    });

    test("GET /category -  should be able to list all categories adm2",async () => {
        await request(app).post("/users").send(mockedUserAdmNv2)
        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv2);
        const adm2Response = await request(app).get("/provider").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`)

        expect(adm2Response.body).toHaveLength(1)
     
    });
    
});
