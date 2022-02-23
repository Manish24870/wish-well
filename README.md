# Wish Well

A place where people wish for apps they want.

&nbsp;

## Live Demo 
## https://wish-well.netlify.app/

&nbsp;

## Technologies Used
- Node JS (for creating backend server)
- Express JS (for REST API)
- React and Redux (for frontend view)
- MongoDB (database)

&nbsp;

## Available Scripts

In the project directory, you can run:

- `npm install` in root directory to install the backend dependencies
- `npm install` inside the **client** folder to install the backend dependencies
- `npm run dev` to start both server and react app at the same time

&nbsp;

## Runs the app in the development mode.
- Server runs at [http://localhost:5000](http://localhost:5000).
- Open [http://localhost:3000](http://localhost:3000) to view the react app in the browser


&nbsp;

## Backend .env file configuration (in root folder)

PORT=5000

NODE_ENV=development

MONGODB_URL="your database connection string"

JWT_SECRET=some-secret


&nbsp;

## Frontend .env file (inside client folder)


REACT_APP_BASE_SERVER_URL="http://localhost:5000"

REACT_APP_BASE_IMAGE_URL="http://localhost:5000"
