import { Model, model, Schema, ValidatorProps } from "mongoose";
import { BooksGenre, IBook } from "../interfaces/books_interface";

const booksSchema = new Schema<IBook>({
    title: {type: String, required: true, trim:true},
    author: {type:String, required: true, trim:true},
    genre: {
        type: String,
        enum: Object.values(BooksGenre),
        default: BooksGenre.SCIENCE
    },
    isbn: {
        type:String, 
        required: true, 
        trim:true, 
        unique: true, 
        validate:{validator: function(value:string){return /^\d{10}(\d{3})?$/.test(String(value))},
        message: (props:ValidatorProps)=>`${props.value} is not a valid isbn. Only numbers are allowed as charecter and strict 10 or 13 digits allowed.`
    }},
    description: {type: String, trim: true},
    copies: {type:Number, required: true, min:0},
    available: {type: Boolean, default: true}
},
{
    versionKey:false, 
    timestamps:true,
    toJSON: {virtuals:true},
    toObject: {virtuals: true},
    id: false
});

// booksSchema.methods.updateAvailability = function(){
//     this.available = this.copies >0;
// }

booksSchema.pre("save", function(){
    this.available = this.copies >0;
})
export const Book = model<IBook>("Book", booksSchema)