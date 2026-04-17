"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDB_1 = require("../configs/mongoDB");
let server;
const PORT = 5000;
async function main() {
    try {
        await mongoose_1.default.connect(mongoDB_1.uri);
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=server.js.map