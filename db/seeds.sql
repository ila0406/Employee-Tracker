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
    ('Manager', 100000.00, 1),
    ('Business Analyst', 99000.00, 6),
    ('Product Manager', 100000.00, 3),
    ('Implementation Specalist', 90000.00, 4),
    ('Consultant', 90000.00, 4),
    ('AccountManager', 100000.00, 4),
    ('Engineer I', 70000.00, 5),
    ('Engineer II', 80000.00, 5),
    ('Engineer III', 90000.00, 5),
    ('CEO', 90000.00, 5);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, manager_id, role_id, department_id)
VALUES 
    ('CEO', 'Jane', NULL, 1, 6),
    ('Delilah', 'Haas', 2, 1, 6),
    ('Crispin', 'Bannerman', 2, 5, 3),
    ('Liz', 'Erd', 2, 2, 6),
    ('Joe', 'Smith',  2, 2, 6),
    ('Elle', 'Phant',  2, 4, 4),
    ('Rose', 'Bush',  2, 5, 4),
    ('Ray', 'OSun',  2, 6, 4),
    ('Tera', 'Dactycl',  2, 9, 5),
    ('Pin', 'Gwen',  9, 7, 5),
    ('Janey', 'Doe',  9, 8, 5),
    ('Alli', 'Gater',  9, 9, 5);

--  SELECT * FROM employee;
 SELECT e.id, e.first_name as FIRST, e.last_name as LAST, e.manager_id as Manager, r.title as Role_title, d.name as Department FROM employee e, role r, department d WHERE e.role_id = r.id and e.department_id = d.id order by d.id,r.id;