import { NextFunction, Request, Response } from "express";

export const errorHandler = (error:any, req: Request, res: Response, next:NextFunction) =>{
    let statusCode = 500;
    let message = "Internal Server Error";
    if(error.name === "ValidationError"){
        statusCode = 400,
        message = "Validation failed"
    }else if (error.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID";
    }else if (error.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value";
    }
    res.status(statusCode).json({
        success: false,
        message,
        error: {
            name: error.name,
            message: error.message
        }
    })
}