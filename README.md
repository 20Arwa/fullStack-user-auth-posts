# User Posts App

A simple full-stack application that allows users to register, log in, and interact with posts by creating, updating, deleting, and liking them.

This project was built for learning and practicing modern full-stack development concepts.

---

## 🌐 Live Demo

👉 https://full-stack-user-auth-posts.vercel.app/

---

## ✨ Features

* User Authentication (Register & Login)
* JWT-based authorization
* Create, update, and delete posts
* Like / Unlike posts
* View user-specific data
* Responsive UI

---

## 🛠️ Tech Stack

### Frontend

* Next.js 
* React
* TypeScript
* Tailwind CSS
* Shadcn UI

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)

---


## 🚀 Getting Started (Run Locally)

### 1. Clone the repository

```bash
git clone https://github.com/20Arwa/fullStack-user-auth-posts.git
cd fullStack-user-auth-posts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create the following environment files:

### 🔹 Server (`/server/.env`)

```env
MONGODB_URL=your_mongodb_connection_string
PORT=5000
ACCESS_TOKEN_SECRET=your_access_token_secret
```

### 🔹 Client (`/client/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```


### 4. Run the development server

```bash
npm run dev
```

### 5. Open in browser

http://localhost:3000

