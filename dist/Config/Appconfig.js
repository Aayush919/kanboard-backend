"use strict";
// config/AppConfig.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AppConfig {
    port;
    databaseUrl;
    constructor() {
        this.port = parseInt(process.env.PORT || "3000", 10);
        this.databaseUrl = process.env.DATABASE_URL || "";
    }
}
exports.default = new AppConfig();
