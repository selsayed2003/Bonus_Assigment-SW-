const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const { books } = require('./data.js');

app.use(express.json()); // Middleware to parse JSON

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'A simple CRUD API to manage books',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./app.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /add_book:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishedYear
 *               - isbn
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: number
 *               isbn:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book added successfully
 *       400:
 *         description: Missing required fields
 */
app.post('/add_book', (req, res) => {
  const { title, author, publishedYear, isbn, genre } = req.body;

  if (!title || !author || !publishedYear || !isbn || !genre) {
    return res.status(400).json('Data is not complete');
  } else {
    const new_book = { id: books.length + 1, title, author, publishedYear, isbn, genre };
    books.push(new_book);
    res.status(200).json('Book is added successfully');
  }
});

/**
 * @swagger
 * /list:
 *   get:
 *     summary: List all books
 *     responses:
 *       200:
 *         description: A list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/list', (req, res) => {
  res.send(books);
});

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for a book by title
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
app.get('/search', (req, res) => {
  const { title } = req.body;
  const result = books.find((book) => book.title === title);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json('Book not found');
  }
});

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete a book by ISBN
 *     parameters:
 *       - in: query
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
app.delete('/delete', (req, res) => {
  const { isbn } = req.query;
  const result_index = books.findIndex((book) => book.isbn === String(isbn));
  if (result_index === -1) {
    res.status(404).json('There is no book with this ISBN');
  } else {
    books.splice(result_index, 1);
    res.status(200).json('The book is deleted successfully');
  }
});

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update a book by ISBN
 *     parameters:
 *       - in: query
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: number
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
app.put('/update', (req, res) => {
  const { isbn } = req.query;
  const { title, author, publishedYear, genre } = req.body;

  const result_book = books.find((book) => book.isbn === String(isbn));

  if (!result_book) {
    return res.status(404).json('There is no book with this ISBN.');
  }
  if (title) result_book.title = title;
  if (author) result_book.author = author;
  if (publishedYear) result_book.publishedYear = publishedYear;
  if (genre) result_book.genre = genre;

  res.status(200).json('The book is updated successfully');
});

app.listen(5000)
