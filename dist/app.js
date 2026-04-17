"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books_controller");
const borrow_controller_1 = require("./app/controllers/borrow_controller");
const errorHandler_1 = require("./middleware/errorHandler");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/api/books', books_controller_1.booksRoutes);
exports.app.use('/api/borrow', borrow_controller_1.borrowBooksRoutes);
exports.app.get('/', (req, res, next) => {
    try {
        res.send(`Welcome to Library Management Book App`);
    }
    catch (error) {
        next(error);
    }
});
exports.app.use(errorHandler_1.errorHandler);
//# sourceMappingURL=app.js.map