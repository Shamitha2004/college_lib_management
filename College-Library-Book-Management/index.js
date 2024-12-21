const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// In-memory storage for books and students
const books = [];
const students = [];

// Book Schema (In-memory)
class Book {
    constructor(title, author, available, popularity) {
        this.title = title;
        this.author = author;
        this.available = available;
        this.popularity = popularity;
    }
}

// Student Schema (In-memory)
class Student {
    constructor(name, usn) {
        this.name = name;
        this.usn = usn;
        this.requests = [];
    }
}

// Queue (For student book requests)
class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(studentRequest) {
        this.items.push(studentRequest);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    peek() {
        return this.items[0];
    }
}

const requestQueue = new Queue();

// Binary Search Tree (For searching books by title)
class BST {
    constructor() {
        this.root = null;
    }

    insert(book) {
        const newNode = new TreeNode(book);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.book.title < node.book.title) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(title) {
        return this.searchNode(this.root, title);
    }

    searchNode(node, title) {
        if (node === null) {
            return null;
        }

        if (title < node.book.title) {
            return this.searchNode(node.left, title);
        } else if (title > node.book.title) {
            return this.searchNode(node.right, title);
        } else {
            return node.book;
        }
    }
}

class TreeNode {
    constructor(book) {
        this.book = book;
        this.left = null;
        this.right = null;
    }
}

const bookBST = new BST();

// API to add a book or an array of books
app.post('/addBook', (req, res) => {
    const booksToAdd = req.body; 

    const booksArray = Array.isArray(booksToAdd) ? booksToAdd : [booksToAdd];

    for (const bookData of booksArray) {
        const { title, author, available, popularity } = bookData;

        if (!title || !author || available === undefined || popularity === undefined) {
        }

        const book = new Book(title, author, available, popularity);
        books.push(book);
        bookBST.insert(book); 
    }

    res.status(200).send({ message: 'Books added successfully!' });
});


// API to get all books sorted by availability and popularity (priority)
app.get('/getBooks', (req, res) => {
    const sortedBooks = books.sort((a, b) => (b.available - a.available || b.popularity - a.popularity));
    res.status(200).send(sortedBooks);
});

// API to request a book (handled using Queue)
app.post('/requestBook', (req, res) => {
    const { usn, bookTitle } = req.body;

    const student = students.find(s => s.usn === usn);
    if (!student) {
        return res.status(404).send({ message: 'Student not registered. Please register first.' });
    }

    const book = books.find(b => b.title === bookTitle);

    // Check if the book exists and is available
    if (book && book.available) {
        student.requests.push(bookTitle);
        book.available = false;
        requestQueue.enqueue({ usn, bookTitle });
        res.status(200).send({ message: 'Book request successful!' });
    } else {
        res.status(400).send({ message: 'Book not available.' });
    }
});


// API to get all student requests
app.get('/studentRequests/:usn', (req, res) => {
    const { usn } = req.params;
    const student = students.find(s => s.usn === usn);

    if (student) {
        res.status(200).send(student.requests);
    } else {
        res.status(404).send({ message: 'Student not found.' });
    }
});

// API to get a book by title using BST
app.get('/searchBook/:title', (req, res) => {
    const { title } = req.params;
    const book = bookBST.search(title);

    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send({ message: 'Book not found.' });
    }
});

// API to check available books
app.get('/availableBooks', (req, res) => {
    const availableBooks = books.filter(book => book.available);
    res.status(200).send(availableBooks);
});

// API to add a student (for testing)
app.post('/addStudent', (req, res) => {
    const { name, usn } = req.body;

    if (!name || !usn) {
        return res.status(400).send({ message: 'Name and USN are required' });
    }

    const existingStudent = students.find(s => s.usn === usn);
    if (existingStudent) {
        return res.status(400).send({ message: 'Student with this USN already exists' });
    }

    const student = new Student(name, usn);
    students.push(student);
    res.status(200).send({ message: 'Student added successfully!' });
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
