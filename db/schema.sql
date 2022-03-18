DROP DATABASE IF EXISTS employee_db;
DROP TABLES IF EXISTS  employee;
DROP TABLES IF EXISTS  role;
DROP TABLES IF EXISTS  department;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department   (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_time DATETIME,
    PRIMARY KEY (id)
);

CREATE TABLE role   (
    -- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_time DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee   (
    -- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT,
    role_id INT,
    department_id INT,
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_time DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

-- TABLES
-- departments
    -- department.ID
    -- department.name
    -- department.created_time
    -- department.updated_time
    -- department.deleted_time
-- roles
    -- roles.ID
    -- roles.job_title
    -- roles.department_id
    -- roles.salary
    -- roles.created_time
    -- roles.updated_time
    -- roles.deleted_time
-- employees
    -- employees.ID
    -- employees.first_name
    -- employees.last_name
    -- employees.manager_id
    -- employees.role_id
    -- employees.department_id
    -- employees.created_time
    -- employees.updated_time
    -- employees.deleted_time
-- company