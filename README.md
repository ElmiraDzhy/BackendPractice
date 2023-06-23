# Superhero CRUD Web Application - Backend

This is the backend part of a CRUD (Create, Read, Update, Delete) web application that manages superheroes. It provides the server-side functionality to handle API requests and interact with a PostgreSQL database using the Express framework and Sequelize ORM.

## Features

- Perform CRUD operations on superheroes (Create, Read, Update, Delete).
- Handle file uploads using Multer library for multipart/form-data.
- Utilize Sequelize ORM for object-relational mapping to interact with PostgreSQL database.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- Multer

## Installation

1. Clone the repository:

   ```shell
   git clone <repository-url>

2. Navigate to the project directory:

   ```shell
   cd superhero-crud-backend
   
3. Install the dependencies:

   ```shell
   npm install

4. Set up the PostgreSQL database:

   Create a new PostgreSQL database.
   Update the database configuration in the .env file or config/config.json file to match your PostgreSQL settings.


5. Run database migrations:

   ```shell
   npx sequelize-cli db:migrate

6. Start the server:

   ```shell
   npm start

7. The server should now be running on http://localhost:3000.

# API Endpoints
The following API endpoints are available:

GET /superheroes - Get a list of all superheroes.
POST /superheroes - Create a new superhero.
GET /superheroes/:id - Get details of a specific superhero.
PUT /superheroes/:id - Update details of a specific superhero.
DELETE /superheroes/:id - Delete a specific superhero.


