DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    wage DECIMAL(10,2) NOT NULL,
    admission_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active'
);

INSERT INTO employees (name, email, position, department, wage, admission_date) VALUES
('John Silva', 'john@company.com', 'Developer', 'IT', 5000.00, '2023-01-15'),
('Mary Santos', 'mary@company.com', 'HR Analyst', 'HR', 4500.00, '2022-06-01'),
('Charles Oliveira', 'charles@company.com', 'Manager', 'Finance', 8000.00, '2021-03-10');
