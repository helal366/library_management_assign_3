"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_models_1 = require("../models/borrow_models");
const books_model_1 = require("../models/books_model");
exports.borrowBooksRoutes = express_1.default.Router();
exports.borrowBooksRoutes.get("/", async (req, res, next) => {
    try {
        const borrowedBooks = await borrow_models_1.BorrowBook.aggregate([
            {
                $lookup: {
                    from: "books",
                    localField: "book",
                    foreignField: "_id",
                    as: "bookdetails",
                },
            },
            { $unwind: "$bookdetails" },
            {
                $group: {
                    _id: "$bookdetails._id",
                    book: {
                        $first: {
                            title: "$bookdetails.title",
                            isbn: "$bookdetails.isbn",
                        },
                    },
                    totalQuantity: { $sum: "$quantity" }
                },
            },
            {
                $project: {
                    _id: 0,
                    book: 1,
                    totalQuantity: 1
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowedBooks,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowBooksRoutes.post("/", async (req, res, next) => {
    try {
        const body = req.body;
        const { book: bookId, quantity } = body;
        if (!bookId) {
            return res.status(404).json({
                success: false,
                message: "Book id required",
            });
        }
        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0",
            });
        }
        const book = await books_model_1.Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        const bookCopies = Number(book.copies);
        if (bookCopies < quantity) {
            return res.status(400).json({
                success: false,
                message: `Not enough copies available. Available copies are ${book.copies}`,
            });
        }
        book.copies = bookCopies - quantity;
        await book.save();
        const borrowBook = await borrow_models_1.BorrowBook.create(body);
        return res.status(201).json({
            success: true,
            message: "Book borrowed successfully.",
            data: borrowBook,
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=borrow_controller.js.map