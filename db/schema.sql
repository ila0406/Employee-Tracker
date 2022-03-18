DROP DATABASE IF EXISTS employee_db;
DROP TABLES IF EXISTS  department;
DROP TABLES IF EXISTS  role;
DROP TABLES IF EXISTS  employee;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE employee   (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id
    role_id
    department_id
    created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_time TIMESTAMP,
    deleted_time TIMESTAMP,
    PRIMARY KEY (id)
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    FOREIGN KEY (managers_id)
    REFERENCES employee(id)
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