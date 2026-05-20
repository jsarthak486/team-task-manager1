Team Task Manager - Full Stack RBAC Web App

This is a full-stack web application where users can create projects, assign tasks, and track progress with role-based access control.

Features:
- User signup and login
- JWT authentication
- Password hashing using bcrypt
- Admin and Member roles
- Admin can create projects
- Admin can create and assign tasks
- Members can view assigned tasks
- Members can update task status
- Dashboard for total, pending, in-progress, completed, and overdue tasks
- REST APIs with MongoDB relationships
- Railway deployment ready

Tech Stack:
Frontend: React.js, Vite, CSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT, bcrypt
Deployment: Railway

Local Setup:

Backend:
1. cd backend
2. npm install
3. Create .env file using .env.example
4. Add MongoDB URI and JWT secret
5. npm run dev

Frontend:
1. cd frontend
2. npm install
3. Create .env file using .env.example
4. npm run dev

Deployment:
Deploy backend and frontend separately on Railway.
Add environment variables on Railway.
Use backend live API URL in frontend VITE_API_URL.

Demo:
Signup as Admin, create project, create members, assign tasks, update status, and show dashboard.
