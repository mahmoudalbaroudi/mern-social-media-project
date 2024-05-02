# mern-social-media-project

This project is a social media platform similar to Facebook, built with Node.js for the backend and React for the frontend. It includes features such as user authentication, profile management, posting, liking posts, following users, and more.

## Backend Overview

The backend of the application was built using Node.js and Express.js framework. Here's a summary of the backend implementation:

Creating Express App: Setting up the Express application to handle HTTP requests and routes.
Connecting MongoDB: Establishing a connection to MongoDB database for storing user data, posts, and other information.
Middlewares and First Request: Implementing middlewares for request logging, error handling, and parsing JSON data. Handling the first HTTP request to ensure the server is running.
Creating User Router: Setting up routes for user-related operations such as registration, login, profile fetching, and updating.
Creating User Model: Defining a user schema and model using Mongoose to structure and interact with user data in MongoDB.
Login and Register System: Implementing user authentication and registration functionality, including password hashing and token-based authentication.
CRUD Operations: Performing CRUD (Create, Read, Update, Delete) operations for users and posts, allowing users to create, edit, and delete their posts.

## Frontend Overview

The frontend of the application was developed using React library along with React Router for client-side routing. Here's an overview of the frontend implementation:

Fetching Data with Axios and Hooks: Fetching data from the backend API using Axios library and React Hooks such as useState and useEffect.
Context API for State Management: Utilizing React Context API to manage global state and share data between components without prop drilling.
Authentication and Authorization: Implementing a login system with authentication tokens and protecting routes based on user authentication status.
Profile Management: Allowing users to view and update their profiles, including profile picture upload and editing personal information.
Post Creation and Interaction: Enabling users to create posts, like and comment on posts, and follow/unfollow other users.
Update and Delete Posts: Providing functionality for users to edit and delete their own posts, ensuring a seamless user experience.
Adding Comments: Implementing the ability for users to add comments to posts, fostering interaction and engagement within the community.
File Upload: Implementing file upload functionality for profile pictures and post images, handling file uploads on both frontend and backend.
UI Components: Designing UI components using Material-UI library for consistent and responsive user interface.

### Getting Started

1. Clone the repository:
   git clone <repository-url>
2. Install dependencies for both frontend and backend:
   cd frontend
   npm install
   cd backend
   npm install
3. Start the backend server:
   npm start
4. Start the frontend development server:
   npm start.
5. Access the application in your browser at http://localhost:3000
