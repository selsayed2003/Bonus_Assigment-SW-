Node.js Book API
A simple Node.js CRUD API for managing books, complete with Docker support and Swagger documentation.

Features
Add, update, delete, and search books.
API documentation with Swagger UI.
Fully Dockerized for ease of deployment.
Prerequisites
Docker installed on your system (Download Docker).
Basic understanding of running Docker containers.
Getting Started
Follow these instructions to build and run the Docker container and access the API documentation.

1. Building and Running the Docker Container
Step 1: Clone the Repository
bash
Copy code
git clone <repository-ssh-url>
cd <repository-folder>
Step 2: Build the Docker Image
Run the following command to build the Docker image:

bash
Copy code
docker build -t node-book-api .
Step 3: Run the Docker Container
Run the container using:

bash
Copy code
docker run -p 5000:5000 node-book-api
-p 5000:5000: Maps port 5000 in the container to port 5000 on your machine.
The API will now be accessible at http://localhost:5000.
Step 4: Test the API
Once the container is running, test the API using your browser, Postman, or curl.

Example:

bash
Copy code
curl http://localhost:5000/list
2. Accessing the Swagger API Documentation
Swagger UI provides interactive API documentation where you can test API endpoints.

Step 1: Navigate to Swagger Documentation
Open your browser and go to:

bash
Copy code
http://localhost:5000/api-docs
Step 2: Explore and Test API Endpoints
Use the Swagger interface to interactively test all API endpoints.
Example endpoints:
GET /list: Fetch all books.
POST /add_book: Add a new book.
PUT /update: Update book details by ISBN.
DELETE /delete: Delete a book by ISBN.
API Endpoints
Here’s an overview of the available API endpoints:

Add a New Book
POST /add_book
Request Body:
json
Copy code
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "publishedYear": 1937,
  "isbn": "9780618968633",
  "genre": "Fantasy"
}
Response:
200 OK: Book added successfully.
400 Bad Request: Missing required fields.
List All Books
GET /list
Response:
200 OK: Returns an array of all books.
Search for a Book
GET /search
Request Body:
json
Copy code
{
  "title": "The Hobbit"
}
Response:
200 OK: Returns the matching book.
404 Not Found: Book not found.
Update a Book
PUT /update
Query Parameters:
isbn (string): ISBN of the book to update.
Request Body (Fields to update):
json
Copy code
{
  "title": "The Hobbit - Updated Edition",
  "author": "J.R.R. Tolkien",
  "genre": "Classic Fantasy"
}
Response:
200 OK: Book updated successfully.
404 Not Found: Book not found.
Delete a Book
DELETE /delete
Query Parameters:
isbn (string): ISBN of the book to delete.
Response:
200 OK: Book deleted successfully.
404 Not Found: Book not found.
Stopping the Container
To stop the running container:

Find the container ID:
bash
Copy code
docker ps
Stop the container:
bash
Copy code
docker stop <container-id>
Additional Notes
The books data is currently stored in-memory. Changes will be lost when the server restarts unless you integrate a database.
Ensure port 5000 is available before running the container. You can change the port mapping in the docker run command if needed.
