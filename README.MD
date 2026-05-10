# 👥 Employee Management System

A full CRUD application for employee management built with ExtJS 6 on the frontend and Node.js + Express + PostgreSQL on the backend.

## Technologies
- **Frontend:** ExtJS 6 (via CDN)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL

## Live Demo
🔗 [View Frontend Demo](https://gutomachaddo.github.io/employee-management-extjs)

> **Note:** The live demo displays a static version of the interface.
> To use the full CRUD functionality, run the project locally following the instructions below.

## How to run locally

### Prerequisites
- Node.js installed
- PostgreSQL installed

### 1. Clone the repository
```bash
git clone https://github.com/seuusuario/employee-management-extjs.git
cd employee-management-extjs
```

### 2. Set up the database
```bash
# Start PostgreSQL and run the setup script
psql -U postgres -d your_database -f setup.sql
```

### 3. Configure environment variables
Create a `.env` file inside the `backend` folder:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rh_db
DB_USER=postgres
DB_PASSWORD=yourpassword
PORT=3000
```

### 4. Start the backend
```bash
cd backend
npm install
npm start
```

### 5. Start the frontend
```bash
cd frontend
npx serve . -l 5500
```

Access **http://localhost:5500** in your browser.

## Features
- List all employees
- Create a new employee
- Edit an existing employee
- Delete an employee
