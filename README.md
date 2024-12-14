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

git clone <repository-ssh-url>
cd <repository-folder>

Step 2: Build the Docker Image

Run the following command to build the Docker image:

docker build -t node-book-api .

Step 3: Run the Docker Container

Run the container using:

docker run -p 5000:5000 node-book-api

-p 5000:5000: Maps port 5000 in the container to port 5000 on your machine.

The API will now be accessible at http://localhost:5000.

Step 4: Test the API

Once the container is running, test the API using your browser, Postman, or curl.

Example:

curl http://localhost:5000/list

2. Accessing the Swagger API Documentation

Swagger UI provides interactive API documentation where you can test API endpoints.

Step 1: Navigate to Swagger Documentation

Open your browser and go to:

http://localhost:5000/api-docs

Step 2: Explore and Test API Endpoints

Use the Swagger interface to interactively test all API endpoints.

endpoints:

GET /list: Fetch all books.

POST /add_book: Add a new book.

PUT /update: Update book details by ISBN.

DELETE /delete: Delete a book by ISBN.

Stopping the Container

To stop the running container:

Find the container ID:

docker ps

Stop the container:

docker stop <container-id>


