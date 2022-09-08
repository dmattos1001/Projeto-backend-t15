"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const data_source_1 = __importDefault(require("../../../data.source"));
const mock_1 = require("../../mocks/mock");
describe("/productentry", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv3);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv2);
        const adminLvl3 = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        yield (0, supertest_1.default)(app_1.default)
            .post("/product")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`)
            .send(); //mocked product
        yield (0, supertest_1.default)(app_1.default)
            .post("/provider")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`)
            .send(mock_1.mockedProvider);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /productentry - Registering product entry", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLvl3 = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        const products = yield (0, supertest_1.default)(app_1.default)
            .get("/product")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
        const providers = yield (0, supertest_1.default)(app_1.default)
            .get("/provider")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
        mock_1.mockedProductEntry.userId = adminLvl3.body.id;
        mock_1.mockedProductEntry.productsId = products.body[0].id;
        mock_1.mockedProductEntry.providerId = providers.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/productentry")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`)
            .send(mock_1.mockedProductEntry);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("quantity");
        expect(response.body).toHaveProperty("userId");
        expect(response.body).toHaveProperty("productsId");
        expect(response.body).toHaveProperty("providerId");
        expect(response.body.name).toEqual("RTX 3080");
        expect(response.body.quantity).toEqual(15);
        expect(response.status).toBe(201);
    }));
    test("POST /productentry -  should not post a product that doesnt exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLvl3 = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/productentry")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`)
            .send(mock_1.mockedProductEntryInvalid);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /productentry -  should not be able to entry a product without authorization", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/productentry")
            .send(mock_1.mockedProductEntry);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("GET /productentry -  should be able to list all product entries", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLvl3 = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/productentry")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
        expect(response.body).toHaveLength(1);
    }));
    test("GET /productentry - should not be able to list product entries without authorization", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/productentry");
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("GET /productentry/:id - should be able to list a product entry", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLvl3 = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        const products = yield (0, supertest_1.default)(app_1.default)
            .get("/product")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
        const providers = yield (0, supertest_1.default)(app_1.default)
            .get("/provider")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
        mock_1.mockedProductEntry.userId = adminLvl3.body.id;
        mock_1.mockedProductEntry.productsId = products.body[0].id;
        mock_1.mockedProductEntry.providerId = providers.body[0].id;
        const productEntries = yield (0, supertest_1.default)(app_1.default)
            .get("/productentry")
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/productentry/${productEntries.body[0].id}`)
            .set("Authorizarion", `Bearer ${adminLvl3.body.token}`);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("quantity");
        expect(response.body).toHaveProperty("userId");
        expect(response.body).toHaveProperty("productsId");
        expect(response.body).toHaveProperty("providerId");
        expect(response.body.name).toEqual(mock_1.mockedProductEntry.name);
        expect(response.body.quantity).toEqual(15);
        expect(response.status).toBe(200);
    }));
    test("GET /productentry/:id - should not be able to list a product entry without authorization", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield (0, supertest_1.default)(app_1.default)
            .post("/productentry")
            .send(mock_1.mockedProductEntry);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/productentry/${product.body.id}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
});
