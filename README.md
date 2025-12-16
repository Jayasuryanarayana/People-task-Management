# Backend Intern Assignment - Task Manager App

A full-stack MERN application (MongoDB, Express, React, Node.js) featuring secure authentication, role-based access control, and a modern dashboard UI.

## Features
- **Authentication:** Secure Login & Registration using JWT & Bcrypt.
- **Task Management:** Create, Read, Delete tasks (Protected Routes).
- **Role-Based Access:** Admin-only routes for user management.
- **Frontend:** Built with React + Tailwind CSS v4 for a responsive UI.
- **Scalability:** Designed with modular architecture for future microservices migration.

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Atlas)
- **Frontend:** React.js, Vite, Tailwind CSS
- **Tools:** Postman, Axios

## Setup Instructions

### 1. Clone the Repo
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd backend-intern-assignment```

### 2.Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
npx nodemon server.js```


### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev```
