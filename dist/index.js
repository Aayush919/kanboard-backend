"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_http_1 = require("node:http");
const Routes_1 = __importDefault(require("./KanbanBoard/Routes"));
const ServerError_1 = require("./Error/ServerError");
// import connectToMongoDB from "Config/db";
const Appconfig_1 = __importDefault(require("./Config/Appconfig"));
const db_1 = __importDefault(require("./Config/db"));
const NotFound_1 = require("./Error/NotFound");
// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
/* ------------------------ PROCESS LEVEL ERROR HANDLERS ------------------------ */
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err?.name, err?.message);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err?.name, err?.message);
    process.exit(1);
});
/* ------------------------ APP INITIALIZATION ------------------------ */
const app = (0, express_1.default)();
const appserver = (0, node_http_1.createServer)(app);
/* ------------------------ MIDDLEWARE ------------------------ */
/* ------------------------ MIDDLEWARE ------------------------ */
app.use(express_1.default.json({ limit: "100mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/api", Routes_1.default);
app.use(NotFound_1.NotFound);
app.use(ServerError_1.ServerError);
/* ------------------------ DB + SERVER START ------------------------ */
try {
    (0, db_1.default)();
}
catch (error) {
    console.error(" Failed to connect DB:", error);
    process.exit(1);
}
appserver.listen(Appconfig_1.default.port, () => {
    console.log(` Server is running on port ${Appconfig_1.default.port}`);
});
