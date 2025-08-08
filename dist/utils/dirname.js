"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__dirname = exports.__filename = void 0;
// utils/dirname.js or directly in your file
const url_1 = require("url");
const path_1 = require("path");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
exports.__filename = __filename;
const __dirname = (0, path_1.dirname)(__filename);
exports.__dirname = __dirname;
