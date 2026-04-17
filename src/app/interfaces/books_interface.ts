import { Document, Model } from "mongoose";

export enum BooksGenre {
    FICTION="FICTION",
    NON_FICTION="NON_FICTION",
    SCIENCE ="SCIENCE",
    HISTORY = "HISTORY",
    FANTASY= "FANTASY",
    BIOGRAPHY = "BIOGRAPHY",
    POLITICS = "POLITICS",
}
export interface IBook{
    title: string,
    author: string,
    genre: BooksGenre,
    isbn: string,
    description?: string,
    copies: number,
    available: boolean,
}

// export interface BookMethods {
//   updateAvailability(): void;
// }

// export interface BookStatic extends Model<IBook>{
//     updateAvailability(id:string):Promise<void>
// }