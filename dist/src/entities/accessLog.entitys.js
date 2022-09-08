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
exports.AccessLog = void 0;
const typeorm_1 = require("typeorm");
const user_entitys_1 = require("./user.entitys");
let AccessLog = class AccessLog {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], AccessLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AccessLog.prototype, "accessDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entitys_1.User, { eager: true }),
    __metadata("design:type", user_entitys_1.User)
], AccessLog.prototype, "user", void 0);
AccessLog = __decorate([
    (0, typeorm_1.Entity)("accessLog")
], AccessLog);
exports.AccessLog = AccessLog;
