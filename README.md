# library_management_assign_3
# 📚 Library Management API

A simple RESTful API built with **Node.js, Express, TypeScript, and MongoDB (Mongoose)** for managing books and borrowing system.

---

## 🚀 Features

- Create, update, delete books
- View all books with filtering, sorting, and pagination
- Borrow books with quantity validation
- Track total borrowed books using aggregation
- Automatic book availability update
- MongoDB relationship between books and borrow records

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

---

## 📁 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/library-management.git
cd library-management
```

### 2. Install dependencies
```
npm install
```

### 3. Create .env file

### 4. Run the project
* Development mode
```
npm run dev
```
* Production build
```
npm run build
or
npm start
```
## API Endpoints
### Books API
#### Create a Book: POST /api/books
--- Request Body:
```
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "SCIENCE",
  "isbn": "1234567890",
  "description": "A programming book",
  "copies": 5
}
```
#### Get All Books: GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=10
You can change the value of filter sortBy sort and limit.

#### Get Single Book: GET /api/books/:bookId
#### Update Book: PUT /api/books/:bookId
*** Request Body (partial update supported):
```
{
  "copies": 10
}
```
#### Delete Book: DELETE /api/books/:bookId


### Borrow API
### Borrow a Book: POST /api/borrow
*** Request Body:
```
{
  "book": "bookId_here",
  "quantity": 2,
  "dueDate": "2026-12-31"
}
```

#### Borrow Summary: GET /api/borrow
*** Returns all borrowed books summary with total borrowed quantity per book. title and isbn will be found for each book.

## Business Logic
- If copies = 0, book becomes unavailable
- Borrowing reduces available copies
- Cannot borrow more than available copies
- Aggregation shows total borrowed quantity per book