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
const data_source_1 = __importDefault(require("../../../data.source"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mock_1 = require("./../../mocks/mock");
describe("/outputsProducts", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /outputsProducts - Creating a new outputsProducts ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").send(mock_1.mockedProduct);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv3);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("descriptio");
        expect(response.body).toHaveProperty("quantity");
        expect(response.body).toHaveProperty("outputdate");
        expect(response.body).toHaveProperty("userId");
        expect(response.body).toHaveProperty("productId");
        expect(response.status).toBe(201);
    }));
    test("POST /outputsProducts - Creating a new outputProducts with name already exists ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").send(mock_1.mockedProduct);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv3);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("placa de video");
        expect(response.body).toHaveProperty("descriptio");
        expect(response.body).toHaveProperty("quantity");
        expect(response.body).toHaveProperty("outputdate");
        expect(response.body).toHaveProperty("userId");
        expect(response.body).toHaveProperty("productId");
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /outputsProducts - creating a outputs Products without being admin level three", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").send(mock_1.mockedProduct);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv2);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv2);
        yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("GET /outputsProducts - list a outputs Products without being admin level two", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").send(mock_1.mockedProduct);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv1);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv1);
        yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(adminLoginResponse.body).toHaveProperty("message");
        expect(adminLoginResponse.status).toBe(401);
    }));
    test("GET /outputsProducts - list a outputs Products", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").send(mock_1.mockedProduct);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv2);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv2);
        const response = yield (0, supertest_1.default)(app_1.default).post("/outputsProducts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    }));
    test("GET /outputsProducts/:id - looking for product output by id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv2);
        const outputLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv2);
        const output = yield (0, supertest_1.default)(app_1.default).get("/outputsProducts");
        const response = yield (0, supertest_1.default)(app_1.default).get(`/outputsProducts/${output.body[0].id}`).set("Authorization", `Bearer ${outputLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    }));
    test("GET /outputsProducts/:id - looking for product output by id without adm2", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv1);
        const outputLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv1);
        const output = yield (0, supertest_1.default)(app_1.default).get("/outputsProducts");
        const response = yield (0, supertest_1.default)(app_1.default).get(`/outputsProducts/${output.body[0].id}`).set("Authorization", `Bearer ${outputLoginResponse.body.token}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
});
