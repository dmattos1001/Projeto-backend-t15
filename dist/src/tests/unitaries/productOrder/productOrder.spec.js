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
describe("/productOrder", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((error) => {
            console.log(error);
        });
        yield (0, supertest_1.default)(app_1.default).post("/provider").send(mock_1.mockedProvider);
        const responseProvider = yield (0, supertest_1.default)(app_1.default).get("/provider");
        mock_1.mockedProduct.provider = responseProvider.body[0].id;
        yield (0, supertest_1.default)(app_1.default).post("/category").send(mock_1.mockedCategory);
        const responseCategory = yield (0, supertest_1.default)(app_1.default).get("/category");
        mock_1.mockedProduct.category = responseCategory.body.id;
        yield (0, supertest_1.default)(app_1.default).post("/product").send(mock_1.mockedProduct);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /productOrder - consola loga", () => __awaiter(void 0, void 0, void 0, function* () {
        const proproduct = yield (0, supertest_1.default)(app_1.default).get("/proproduct");
        mock_1.mockedProductOrder.productId = proproduct.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/productOrder")
            .send(mock_1.mockedProductOrder);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("quantityOfProducts");
        expect(response.body).toHaveProperty("requestDate");
        expect(response.status).toBe(200);
    }));
    test("POST /productOrder ", () => __awaiter(void 0, void 0, void 0, function* () {
        const proproduct = yield (0, supertest_1.default)(app_1.default).get("/proproduct");
        mock_1.mockedProductOrder.productId = proproduct.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/productOrder")
            .send(mock_1.mockedProductOrder);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("quantityOfProducts");
        expect(response.body).toHaveProperty("requestDate");
        expect(response.status).toBe(200);
    }));
    test("POST /productOrder - should not be able to create productOrder that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const proproduct = yield (0, supertest_1.default)(app_1.default).get("/proproduct");
        mock_1.mockedProductOrder.productId = proproduct.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/productOrder")
            .send(mock_1.mockedProductOrder);
        expect(response).toHaveProperty("message");
        expect(response.body).toBe(400);
    }));
    test("POST /productOrder - should not be able to create property with invalid categoryId ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/productOrder")
            .send(mock_1.mockedProductOrderInvalidId);
        expect(response).toHaveProperty("message");
        expect(response.body).toBe(404);
    }));
    test("GET /productOrder", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/productOrder");
        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    }));
    test("GET /productOrder/<id>", () => __awaiter(void 0, void 0, void 0, function* () {
        const productOrder = yield (0, supertest_1.default)(app_1.default).get("/productOrder");
        const response = yield (0, supertest_1.default)(app_1.default).get(`/productOrder/${productOrder.body[0].id}`);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("quantityOfProducts");
        expect(response.body).toHaveProperty("requestDate");
        expect(response.status).toBe(200);
    }));
    test("GET /productOrder/<id>", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/productOrder/9f8ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    }));
});
