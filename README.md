# Superheroes Application

This application allows users to **create**, **edit**, **delete**, and **view** superhero profiles. The project consists of a **frontend** built with React and a **backend** using Express, connected to a PostgreSQL database.

## Getting Started

1. Clone this repository to your local machine.
2. Follow the instructions below to set up the frontend and backend components.

## Frontend Setup

1. Navigate to the `frontend` directory:  
   cd frontend  

2. Install dependencies:  
   npm install  

3. Create a .env file in the `frontend` directory with the following content:  
   REACT_APP_API_URL=http://localhost:3001  

4. Start the frontend application:  
   npm run start  

## Backend Setup

1. Navigate to the `backend` directory:  
   cd backend  

2. Install dependencies:  
   npm install  

3. Create a .env file in the `backend` directory with the following content:  
   PORT=3001  
   DB_HOST=localhost  
   DB_PORT=5432  
   DB_USER=postgres  
   DB_PASSWORD=password  
   DB_DATABASE=superheros  

4. Start the backend application:  
   npm run dev  

## Environment Variables

| Variable            | Description                                          |
|---------------------|------------------------------------------------------|
| REACT_APP_API_URL   | The URL for the API endpoint of the backend.        |
| PORT                | The port number for the backend server to listen on.|
| DB_HOST             | The host for the PostgreSQL database.               |
| DB_PORT             | The port for the PostgreSQL database connection.     |
| DB_USER             | The username for the PostgreSQL database.           |
| DB_PASSWORD         | The password for the PostgreSQL database.           |
| DB_DATABASE         | The name of the PostgreSQL database.                |

## Usage

- Navigate to the frontend URL to interact with the application.
- You can create, edit, delete, and view superhero profiles through the user interface.

## Endpoints

### Superhero API Endpoints

- `GET /superheroes` - Retrieve a list of all superheroes.
- `GET /superheroes/:id` - Retrieve a superhero by ID.
- `GET /superheroes/count` - Retrieve count of superheroes.
- `POST /superheroes` - Create a new superhero.
- `PUT /superheroes/:id` - Update an existing superhero.
- `DELETE /superheroes/:id` - Delete a superhero by ID.
