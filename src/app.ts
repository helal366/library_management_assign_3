import express, { Application, NextFunction, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books_controller";
import { borrowBooksRoutes } from "./app/controllers/borrow_controller";
import { errorHandler } from "./middleware/errorHandler";
export const app:Application = express();
app.use(express.json());
app.use('/api/books', booksRoutes);
app.use('/api/borrow', borrowBooksRoutes);
app.get('/', (req:Request, res:Response, next:NextFunction)=>{
    try {
        res.send(`Welcome to Library Management Book App`)
    } catch (error) {
        next(error)
    }
})
app.use(errorHandler);