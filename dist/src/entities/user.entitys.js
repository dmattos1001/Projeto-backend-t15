"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const accessLog_entitys_1 = require("./accessLog.entitys");
const address_entitys_1 = require("./address.entitys");
const outputProduct_entitys_1 = require("./outputProduct.entitys");
const ProductEntry_entitys_1 = require("./ProductEntry.entitys");
const productOrder_entitys_1 = require("./productOrder.entitys");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "contractDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "administrationNivel", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], User.prototype, "occupation", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], User.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], User.prototype, "cell", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entitys_1.Address, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entitys_1.Address)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductEntry_entitys_1.ProductEntry, (ProductEntry) => ProductEntry.user),
    __metadata("design:type", Array)
], User.prototype, "productEntry", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accessLog_entitys_1.AccessLog, (AccessLog) => AccessLog.user),
    __metadata("design:type", Array)
], User.prototype, "accessLog", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productOrder_entitys_1.ProductOrder, (ProductOrder) => ProductOrder.user),
    __metadata("design:type", Array)
], User.prototype, "productOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => outputProduct_entitys_1.OutputProduct, (OutputProduct) => OutputProduct.user),
    __metadata("design:type", outputProduct_entitys_1.OutputProduct)
], User.prototype, "outputProduct", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("user")
], User);
exports.User = User;
