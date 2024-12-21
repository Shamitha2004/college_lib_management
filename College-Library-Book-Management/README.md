# College Library Book Management System

This project is a College Library Book Management System that allows students to manage book requests, check availability, and handle book reservations efficiently. The system uses data structures such as **Queues**, **Binary Search Trees (BST)**, **Arrays**, and **Stacks** to manage the books and student requests.

## Features
- **Add Books**: Add a single or multiple books to the system.
- **Search for Books**: Search for books by title using a **Binary Search Tree**.
- **Request Books**: Students can request books if they are available.
- **View Book Requests**: Students can view their requested books.
- **Sort Books**: Books are sorted by popularity and availability.
- **Available Books**: Check the list of available books for request.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **Body-Parser**: Middleware to parse JSON requests.
- **In-memory storage**: Books and student data are stored in memory for this implementation.
- **Data Structures**: 
  - **Queue** for managing student book requests.
  - **Binary Search Tree (BST)** for searching books by title.
  - **Arrays** for managing book details.

## API Endpoints

### 1. Add a Student
- **Method**: `POST`
- **URL**: `http://localhost:5000/addStudent`
- Response:
  - Success: `{ "message": "Student added successfully!" }`
  - Error: `{ "message": "Student with this USN already exists" }`

### 2. Add Books
- **Method**: `POST`
- **URL**: `http://localhost:5000/addBook`
- Response:
  - Success: `{ "message": "Books added successfully!" }`
  - Error: `{ "message": "All fields are required for each book" }`

### 3. Get List of Books
- **Method**: `GET`
- **URL**: `http://localhost:5000/getBooks`
- Response: List of books sorted by availability and popularity.

### 4. Request a Book
- **Method**: `POST`
- **URL**: `http://localhost:5000/requestBook`
- Response:
  - Success: `{ "message": "Book request successful!" }`
  - Error: `{ "message": "Book not available." }`

### 5. Get Student Book Requests
- **Method**: `GET`
- **URL**: `http://localhost:5000/studentRequests/:usn`
- Response:
  - Success: `[ "Introduction to Algorithms" ]`
  - Error: `{ "message": "Student not found." }`

### 6. Search for a Book by Title
- **Method**: `GET`
- **URL**: `http://localhost:5000/searchBook/:title`
- Response:
  - Success:
    ```
    {
       "title": "Book Title",
       "author": "Author name",
       "available": true / false,
       "popularity": popularity_range
    }
    ```
  - Error: `{ "message": "Book not found." }`

### 7. Get Available Books
- **Method**: `GET`
- **URL**: `http://localhost:5000/availableBooks`
- Response: List of books that are available for request.


##