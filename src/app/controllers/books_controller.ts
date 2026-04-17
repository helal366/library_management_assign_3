import express, { Application, NextFunction, Request, Response } from "express";
import { Book } from "../models/books_model";
import { BooksGenre } from "../interfaces/books_interface";
export const booksRoutes = express.Router();
booksRoutes.get('/', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const {filter,sortBy,sort,limit}=req.query;
        const limitNumber = limit ? parseInt(limit as string): 10;
        const sortField = sortBy ? (sortBy as string): "createdAt";
        const sortOrder =  sort? sort === "asc" ? 1 : -1 :1;
        const myFilter: any = {};
        if(filter && Object.values(BooksGenre).includes(filter as BooksGenre)){
            myFilter.genre = filter;
        }
        const books = await Book.find(myFilter).sort({sortField: sortOrder}).limit(limitNumber)
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully.",
            data: books
        })
    } catch (error) {
        next(error)
    }
});

booksRoutes.get('/:bookId', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const {bookId} = req.params;
        const book = await Book.findById(bookId);
        if(!book){
            return res.status(404).json({
                success: false,
                message: "Book not found.",
                data: null
            })
        }
        return res.status(200).json({
        success: true,
        message: "Book retrieved successfully.",
        data: book
    })
    } catch (error) {
        next(error)
    }
    
});

booksRoutes.post('/', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const body = req.body;
        if(!body.title || !body.author || !body.copies || body.genre){
            res.status(400).json({
                success:false,
                message: "Missing required fields"
            })
        }
        const newBook = new Book(body);
        await newBook.save();
        return res.status(201).json({
            success: true,
            message: "Book created successfully.",
            data: newBook
        })
    } catch (error) {
        next(error);
    }
})

booksRoutes.put('/:bookId', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const {bookId} = req.params;
        const body = {...req.body};
        if(body.copies !== undefined){
            body.available = body.copies > 0;
        }
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            body,
            {new:true, runValidators: true});
        if(!updatedBook){
            return res.status(404).json({
                success: false,
                message: "Book not found.",
                data: null
            })
        }
        
        res.status(200).json({
            success: true,
            message: "Book updated successfully.",
            data: updatedBook
        })
    } catch (error) {
        next(error)
    }
});

booksRoutes.delete('/:bookId', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const {bookId} = req.params;
        const deletedBook = await Book.findOneAndDelete({_id: bookId});
        if(!deletedBook){
            return res.status(404).json({
                success: false,
                message: "Book not found."
            })
        };
        res.status(200).json({
            success: true,
            message: "Book deleted successfully.",
            data: null
        })
    } catch (error) {
        next(error)
    }
})