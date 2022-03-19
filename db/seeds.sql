INSERT INTO department (name)
VALUES 
    ('IT'),
    ('Product'),
    ('Sales'),
    ('Customer Sucess'),
    ('Engineering'),
    ('Operations'),
    ('Marketing');

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Manager', 10000.00, 1),
    ('Manager', 10000.00, 2),
    ('Manager', 10000.00, 3),
    ('Manager', 10000.00, 4),
    ('Manager', 10000.00, 5),
    ('Manager', 10000.00, 6),
    ('Manager', 10000.00, 7);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, manager_id, role_id, department_id)
VALUES 
    ('Delilah', 'Haas', NULL, 1, 1),
    ('Crispin', 'Bannerman', 1, 1, 1),
    ('Liz', 'Erd', 1, 1, 1),
    ('Joe', 'Smith',  1, 1, 1),
    ('Elle', 'Phant',  1, 1, 1),
    ('Rose', 'Bush',  1, 1, 1),
    ('Ray', 'OSun',  1, 1, 1),
    ('Tera', 'Dactycl',  1, 1, 1),
    ('Pin', 'Gwen',  1, 1, 1),
    ('Janey', 'Doe',  1, 1, 1),
    ('Alli', 'Gater',  1, 1, 1);

 SELECT * FROM employee;   