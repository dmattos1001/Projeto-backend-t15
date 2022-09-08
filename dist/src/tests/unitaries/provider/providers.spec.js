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
describe("/provider", () => {
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
    test("POST /provider - Creating a new provider ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/provider").send(mock_1.mockedProvider);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv3);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        yield (0, supertest_1.default)(app_1.default).post("/provider").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("telephone");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("cnpj");
        expect(response.body).toHaveProperty("address");
        expect(response.body).toHaveProperty("employee");
        expect(response.body).toHaveProperty("employeeCell");
        expect(response.body.name).toEqual("Megabyte");
        expect(response.body.email).toEqual("megaByte@mail.com");
        expect(response.status).toBe(201);
    }));
    test("POST /provider -  shouldn't be able to create an equal cnpj already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/provider").send(mock_1.mockedProviderEqualCnpj);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /provider - creating a provider without being admin level three", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv1);
        const adm1LoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv1);
        const responseAdm1 = yield (0, supertest_1.default)(app_1.default).post("/provider").set("Authorization", `Bearer ${adm1LoginResponse.body.token}`);
        expect(responseAdm1.body).toHaveProperty("message");
        expect(responseAdm1.status).toBe(400);
    }));
    test("POST /provider - creating a provider without being admin level three", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv2);
        const adm2LoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv2);
        const responseAdm2 = yield (0, supertest_1.default)(app_1.default).post("/provider").set("Authorization", `Bearer ${adm2LoginResponse.body.token}`);
        expect(responseAdm2.body).toHaveProperty("message");
        expect(responseAdm2.status).toBe(400);
    }));
    test("GET /provider -  should be able to list all providers adm2", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv2);
        const admin2LoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv2);
        const adm2Response = yield (0, supertest_1.default)(app_1.default).get("/provider").set("Authorization", `Bearer ${admin2LoginResponse.body.token}`);
        expect(adm2Response.body).toHaveLength(1);
    }));
    test("GET /provider -  should be able to list all providers adm3", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv3);
        const admin3LoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        const adm3Response = yield (0, supertest_1.default)(app_1.default).get("/provider").set("Authorization", `Bearer ${admin3LoginResponse.body.token}`);
        expect(adm3Response.body).toHaveLength(1);
    }));
    test("GET /provider -  should not be able to list providers without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/provider");
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("GET /provider -  should not be able to list providers not being admin 2 or 3", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv1);
        const providerLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv1);
        const response = yield (0, supertest_1.default)(app_1.default).get("/provider").set("Authorization", `Bearer ${providerLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
    test("GET /provider/:id -  looking for only one provider adm2", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv2);
        const providerLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv2);
        const provider = yield (0, supertest_1.default)(app_1.default).get("/provider");
        const response = yield (0, supertest_1.default)(app_1.default).get(`/provider/${provider.body[0].id}`).set("Authorization", `Bearer ${providerLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("telephone");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("cnpj");
        expect(response.body).toHaveProperty("address");
        expect(response.body).toHaveProperty("employee");
        expect(response.body).toHaveProperty("employeeCell");
    }));
    test("GET /provider/:id -  looking for only one provider adm3", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv3);
        const providerLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv3);
        const provider = yield (0, supertest_1.default)(app_1.default).get("/provider");
        const response = yield (0, supertest_1.default)(app_1.default).get(`/provider/${provider.body[0].id}`).set("Authorization", `Bearer ${providerLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("telephone");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("cnpj");
        expect(response.body).toHaveProperty("address");
        expect(response.body).toHaveProperty("employee");
        expect(response.body).toHaveProperty("employeeCell");
    }));
    test("GET /provider/:id -  accessing the route without being admin", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.mockedUserAdmNv1);
        const providerLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.mockerLoginAdmNv1);
        const provider = yield (0, supertest_1.default)(app_1.default).get("/provider");
        const response = yield (0, supertest_1.default)(app_1.default).get(`/provider/${provider.body[0].id}`).set("Authorization", `Bearer ${providerLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
    test("GET /provider/:id -  listing a provider with invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/provider/33970640-5dbe-623a-9a5j-6c24b3794351`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    }));
});
