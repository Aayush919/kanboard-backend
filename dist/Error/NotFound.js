"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const Api_1 = require("../Api");
const NotFound = (req, res, next) => {
    return (0, Api_1.ErrorResponse)(res, Api_1.STATUS_CODE.NOT_FOUND, `Route not found : ${req.originalUrl}`);
};
exports.NotFound = NotFound;
