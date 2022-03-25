// const express = require('express');
// Import and require mysql2

// 1) Require
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
// const { query1name, query2name, query3name }= require('./queries');

// 2) Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'tuesday3',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// 3) questions from inquirer
const mainMenu = {
    type: 'list',
    name: 'menuCommand',
    message: 'What would you like to do?',
    choices: [
        '01) View All Employees',
        '02) Add Employee',
        '03) Remove Employee',
        '04) Update Employee Role',
        '05) Update Employee Manager',
        '06) Update Employee Department',
        '07) View All Roles',
        '08) Add Role',
        '09) View all Departments',
        '10) Add Department',
        '11) View All Employees By Department',
        '12) View All Employees by Manager',
        'Quit'
    ]
};

// Function to initialize app and navigate to options
async function init ()  {
    let answer = await inquirer.prompt(mainMenu);

    switch (answer.menuCommand) {
        case '01) View All Employees':
            await allEmployees();
            break;
        case '02) Add Employee':
            await addEmployee();
            break;
        case '03) Remove Employee':
            await removeEmployee();
            break;
        case '04) Update Employee Role':
            await updateEmployeeRole();
            break;
        case '05) Update Employee Manager':
            await updateEmployeeManager();
            break;
        case '06) Update Employee Department':
            await updateEmployeeDept();
            break;
        case '07) View All Roles':
            await allRoles();
            break;
        case '08) Add Role':
            await addRole();
            break;
        case '09) View all Departments':
            await allDepartments();
            break;
        case '10) Add Department':
            await addDepartment();
            break;
        case '11) View All Employees By Department':
            await allEmployeesByDept();
            break;
        case '12) View All Employees by Manager':
            await allEmployeesByManager();
            break;
        case 'Quit':
            process.exit();
        default:
            break;
    }

    // await init();
};

// Menu option 01) View All Employees
function allEmployees() {
    const query = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS Name, role.title AS Title, role.salary AS Salary, CONCAT(m.first_name, " ", m.last_name) AS Manager, department.name AS Department FROM employee e INNER JOIN role ON role_id=role.id INNER JOIN employee m ON e.manager_id=m.id INNER JOIN department ON role.department_id=department.id and e.deleted_time is NULL order by e.id;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.table(res);
        init();
    });
};

// Menu option 02) Add Employee
async function addEmployee() {
    
    console.log('ADDING EMPLOYEE');

    const addname = await inquirer.prompt(namePrompt());

    db.query('SELECT * FROM role ORDER BY role.id;', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What is the employees role?: '
            }
        ]);

        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        db.query('SELECT * FROM employee', async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => `${res.first_name} ${res.last_name}`);
            choices.push('none');
            let { manager } = await inquirer.prompt([
                {
                    name: 'manager',
                    type: 'list',
                    choices: choices,
                    message: 'Choose the employee Manager: '
                }
            ]);
            let managersID;
            let managerName;
            if (manager === 'none') {
                managersID = null;
            } else {
                for (const data of res) {
                    data.fullName = `${data.first_name} ${data.last_name}`;
                    if (data.fullName === manager) {
                        managersID = data.id;
                        managerName = data.fullName;
                        console.log(managersID);
                        console.log(managerName);
                        continue;
                    }
                }
            }
            
            db.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: addname.first,
                    last_name: addname.last,
                    role_id: roleId,
                    manager_id: parseInt(managersID)
                },
                (err, res) => {
                    if (err) throw err;
                    init();
                }
            );
        });
    });
};

function namePrompt() {
    return ([
        {
            name: "first",
            type: "input",
            message: "Enter the first name: "
        },
        {
            name: "last",
            type: "input",
            message: "Enter the last name: "
        }
    ]);
}

// // Menu option 03) Remove Employee
async function removeEmployee() {
    console.log('REMOVING EMPLOYEE');

    db.query('SELECT * FROM employee WHERE deleted_time is NULL;', async (err, res) => {
        if (err) throw err;
        let choices = res.map(res => `${res.id} ${res.first_name} ${res.last_name}`);
        choices.push('none');
        let { employee } = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: choices,
                message: 'Choose the employee: '
            }
        ]);
        
        let employeeId;
        for (const row of res) {
                employeeId = row.id;
                continue;
        }

        console.log(employeeId);
        
        const query = `UPDATE employee SET deleted_time = CURRENT_TIMESTAMP WHERE id =${employeeId}`;
        console.log(query);

        db.query(query, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.log('DELETE THE EMPLOYEES');
            init();
        });
    });
};
    

// Menu option 04) Update Employee Role
function updateEmployeeRole() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
        console.log('\n');
        console.log('Updating a employees Role will be in v2');
//         console.table(res);
//         init();
//     });
};

// Menu option 05) Update Employee Manager
function updateEmployeeManager() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
        console.log('\n');
        console.log('Updating a employees Manager will be in v2');
//         console.table(res);
//         init();
//     });
};

// Menu option 06) Update Employee Department
function updateEmployeeDept() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
        console.log('\n');
        console.log('Updating a employees Department will be in v2');
//         console.table(res);
//         init();
//     });
};

// Menu option 07) View All Roles
function allRoles() {
    const query = `SELECT r.id, r.title as role_title, r.salary, d.name as department_name FROM role r, department d WHERE d.id = r.department_id and d.deleted_time is NULL;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL ROLES');
        console.table(res);
        init();
    });
};

// Menu option 08) Add Role
function addRole() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
        console.log('\n');
        console.log('Adding a Role will be in v2');
//         console.table(res);
//         init();
//     });
};

// Menu option 09) View all Departments
function allDepartments() {
    const query = `SELECT id, name FROM department WHERE deleted_time is NULL;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL DEPARTMENTS');
        console.table(res);
        init();
    });
};

// Menu option 10) Add Department
function addDepartment() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
        console.log('\n');
        console.log('Adding a Department will be in v2');
//         console.table(res);
//         init();
//     });
};

// Menu option 11) View All Employees By Department
function allEmployeesByDept() {
    const query = `SELECT id, first_name, last_name, manager_id, role_id, department_id FROM employee WHERE deleted_time is NULL ORDER BY department_id;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('');
        console.table(res);
        init();
    });
};

// Menu option 12) View All Employees by Manager
function allEmployeesByManager() {
    const query = `SELECT id, first_name, last_name, manager_id, role_id, department_id FROM employee WHERE deleted_time is NULL ORDER BY manager_id;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('');
        console.table(res);
        init();
    });
};


// Function call to initialize app
init();