import { model, Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/borrow_interface";

const borrowSchema = new Schema<IBorrowBook>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number, 
        required: true, 
        min:1
    },
    dueDate: {type: Date, required: true}
},
{
    versionKey: false, 
    timestamps: true,
    id: false
});

export const BorrowBook = model<IBorrowBook>("BorrowBook", borrowSchema)