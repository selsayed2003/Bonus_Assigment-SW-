

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: "3.0.0", // Specify OpenAPI version
        info: {
            title: "Book API", // Title of the API
            version: "1.0.0", // Version of the API
            description: "A simple API to manage books", // API description
        },
        servers: [
            {
                url: "http://localhost:5000", // API base URL
            },
        ],
    },
    apis: ["./routes/*.js", "./app.js"], // Path to the API docs (use relative path to your JS files)
};

// Initialize Swagger docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;