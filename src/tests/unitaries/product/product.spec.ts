import { DataSource } from "typeorm";
import AppDataSource from "../../../data.source";
import request from "supertest"
import app from "../../../app";
import { mockedCategory, mockedProduct, mockedProvider, mockedUserAdmNv1, mockedUserAdmNv3, mockerLoginAdmNv1, mockerLoginAdmNv3 } from "../../mocks/mock";
import createUserService from "../../../service/user/createUser.service";

describe("/product", () => {
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
        await request(app)
        .post("/provider")
        .set("Authorization", `Bearer ${administrationNivel3.body.token}`)
        .send(mockedProvider);

        await request(app)
        .post("/category")
        .set("Authorization", `Bearer ${administrationNivel3.body.token}`)
        .send(mockedCategory);

        const responseProvider = await request(app)
        .get("/provider")
        .set("Authorization", `Bearer ${administrationNivel3.body.token}`);
        mockedProduct.provider = responseProvider.body[0].id;

        const responseCategory = await request(app)
        .get("/category")
        .set("Authorization", `Bearer ${administrationNivel3.body.token}`);
        mockedProduct.category = responseCategory.body[0].id;

    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /product - Creating a new product adm2",async () => {

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).post("/product").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProduct)
                
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("value");
        expect(response.body).toHaveProperty("saleValue");
        expect(response.body).toHaveProperty("stock");
        expect(response.body).toHaveProperty("criticalStock");
        expect(response.body).toHaveProperty("provider");
        expect(response.body).toHaveProperty("category");
        expect(response.status).toBe(201); 

    });

    test("POST /product -  shouldn't be able to create an equal name already exists",async () => {

        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).post("/product").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProduct)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
             
    });

    test("POST /product - creating a product without being admin level adm2",async () =>{
        await request(app).post("/users").send(mockedUserAdmNv1)
        const adm1LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1);
        const responseAdm1 = await request(app).post("/category").set("Authorization", `Bearer ${adm1LoginResponse.body.token}`);
        
        expect(responseAdm1.body).toHaveProperty("message");
        expect(responseAdm1.status).toBe(403);
       
    });

    test("GET /product -  should be able to list all product adm2",async () => {

        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).get("/product").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`)

        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("description");
        expect(response.body[0]).toHaveProperty("value");
        expect(response.body[0]).toHaveProperty("saleValue");
        expect(response.body[0]).toHaveProperty("stock");
        expect(response.body[0]).toHaveProperty("criticalStock");
        expect(response.body[0]).toHaveProperty("provider");
        expect(response.body[0]).toHaveProperty("category");
        expect(response.status).toBe(200); 
     
    });

    test("GET /product/:id -  should be able to list one product adm2",async () => {

        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const product = await request(app).get("/product").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);
        const response = await request(app).get(`/product/${product.body[0].id}`).set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);

        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("value");
        expect(response.body).toHaveProperty("saleValue");
        expect(response.body).toHaveProperty("stock");
        expect(response.body).toHaveProperty("criticalStock");
        expect(response.body).toHaveProperty("provider");
        expect(response.body).toHaveProperty("category");
        expect(response.status).toBe(200); 
     
    });

    test("GET /product/:id -  not found product adm2",async () => {

        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const response = await request(app).get(`/product/33933660-5dbe-453a-9a9d-5c73b31943cf`).set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
     
    });

    test("GET /product/:id - a product whithout adm 3",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv1);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("DELETE /product/:id -  deactivating a product",async () => {
        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const product = await request(app).get("/product").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);
        const response = await request(app).delete(`/product/${product.body[0].id}`).set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);
       
        const findProduct = await request(app).get("/product").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);
        
        expect(response.status).toBe(200);
        expect(findProduct.body[0].isActive).toBe(false);
        
    });

    test("DELETE /product/:id -  deactivating a product whithout adm 3",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        const productDeactivating = await request(app).get("/product").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        const response = await request(app).delete(`/product/${productDeactivating.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });
    
    test("DELETE /product/:id -  should not be able to delete product with invalid id",async () => {
        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);
        
        const response = await request(app).delete(`/product/33933660-5dbe-453a-9a9d-5c73b31943cf`).set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
     
    });

    test("DELETE /product/:id - deactivating an already deactivated product",async () => {
        const admin2LoginResponse = await request(app).post("/login").send(mockerLoginAdmNv3);

        const productDeactivating = await request(app).get("/product").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);

        const response = await request(app).delete(`/product/${productDeactivating.body[0].id}`).set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
     
    });

    
});
