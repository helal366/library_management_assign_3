"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books_model");
const books_interface_1 = require("../interfaces/books_interface");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.get('/', async (req, res, next) => {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const limitNumber = limit ? parseInt(limit) : 10;
        const sortField = sortBy ? sortBy : "createdAt";
        const sortOrder = sort ? sort === "asc" ? 1 : -1 : 1;
        const myFilter = {};
        if (filter && Object.values(books_interface_1.BooksGenre).includes(filter)) {
            myFilter.genre = filter;
        }
        const books = await books_model_1.Book.find(myFilter).sort({ sortField: sortOrder }).limit(limitNumber);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully.",
            data: books
        });
    }
    catch (error) {
        next(error);
    }
});
exports.booksRoutes.get('/:bookId', async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const book = await books_model_1.Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
                data: null
            });
        }
        return res.status(200).json({
            success: true,
            message: "Book retrieved successfully.",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
});
exports.booksRoutes.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.title || !body.author || !body.copies || body.genre) {
            res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }
        const newBook = new books_model_1.Book(body);
        await newBook.save();
        return res.status(201).json({
            success: true,
            message: "Book created successfully.",
            data: newBook
        });
    }
    catch (error) {
        next(error);
    }
});
exports.booksRoutes.put('/:bookId', async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const body = { ...req.body };
        if (body.copies !== undefined) {
            body.available = body.copies > 0;
        }
        const updatedBook = await books_model_1.Book.findByIdAndUpdate(bookId, body, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
                data: null
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully.",
            data: updatedBook
        });
    }
    catch (error) {
        next(error);
    }
});
exports.booksRoutes.delete('/:bookId', async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const deletedBook = await books_model_1.Book.findOneAndDelete({ _id: bookId });
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }
        ;
        res.status(200).json({
            success: true,
            message: "Book deleted successfully.",
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=books_controller.js.map