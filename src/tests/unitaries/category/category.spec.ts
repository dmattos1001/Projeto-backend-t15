import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";
import { mockedCategory, mockedUserAdmNv1, mockedUserAdmNv3, mockerLoginAdmNv1, mockerLoginAdmNv3 } from "../../mocks/mock";
import createUserService from "../../../service/user/createUser.service";

describe("/category", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
        await createUserService(mockedUserAdmNv3);
        await createUserService(mockedUserAdmNv1);
        await request(app).post("/login").send(mockerLoginAdmNv3);
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /category - Creating a new category adm2",async () => {

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).post("/category").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedCategory)
                
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
        expect(response.status).toBe(201); 

    });

    test("POST /category -  shouldn't be able to create an equal name already exists",async () => {

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).post("/category").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedCategory);

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

        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).get("/category").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`)

        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("description");
        expect(response.status).toBe(200); 
     
    });

    test("GET /category/:id -  should be able to ONE category adm2",async () => {

        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).get("/category").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`)

        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("description");
        expect(response.status).toBe(200); 
     
    });

    test("GET /category/:id -  should be able to ONE category adm1 ERRO",async () => {

        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1);
        const category = await request(app).get("/category").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);

        expect(category.body).toHaveProperty("message");
        expect(category.status).toBe(403);
     
    });
    
});
