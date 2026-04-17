"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const books_interface_1 = require("../interfaces/books_interface");
const booksSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        enum: Object.values(books_interface_1.BooksGenre),
        default: books_interface_1.BooksGenre.SCIENCE
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: { validator: function (value) { return /^\d{10}(\d{3})?$/.test(String(value)); },
            message: (props) => `${props.value} is not a valid isbn. Only numbers are allowed as charecter and strict 10 or 13 digits allowed.`
        }
    },
    description: { type: String, trim: true },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false
});
// booksSchema.methods.updateAvailability = function(){
//     this.available = this.copies >0;
// }
booksSchema.pre("save", function () {
    this.available = this.copies > 0;
});
exports.Book = (0, mongoose_1.model)("Book", booksSchema);
//# sourceMappingURL=books_model.js.map