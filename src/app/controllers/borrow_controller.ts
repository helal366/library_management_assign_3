import express, { Application, NextFunction, Request, Response } from "express";
import { BorrowBook } from "../models/borrow_models";
import { Book } from "../models/books_model";
export const borrowBooksRoutes = express.Router();

borrowBooksRoutes.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowedBooks = await BorrowBook.aggregate([
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
            totalQuantity: {$sum: "$quantity"}
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
    } catch (error) {
      next(error);
    }
  },
);
borrowBooksRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
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
      const book = await Book.findById(bookId);
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
      const borrowBook = await BorrowBook.create(body);
      return res.status(201).json({
        success: true,
        message: "Book borrowed successfully.",
        data: borrowBook,
      });
    } catch (error) {
      next(error);
    }
  },
);
