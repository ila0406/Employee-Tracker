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
            await allEmployees();
            break;
        case '03) Remove Employee':
            await allEmployees();
            break;
        case '04) Update Employee Role':
            await allEmployees();
            break;
        case '05) Update Employee Manager':
            await allEmployees();
            break;
        case '06) Update Employee Department':
            await allEmployees();
            break;
        case '07) View All Roles':
            await allRoles();
            break;
        case '08) Add Role':
            console.log('Option8');
            break;
        case '09) View all Departments':
            await allDepartments();
            break;
        case '10) Add Department':
            await allEmployees();
            break;
        case '11) View All Employees By Department':
            await allEmployees();
            break;
        case '12) View All Employees by Manager':
            await allEmployees();
            break;
        case 'Quit':
            process.exit();
        default:
            break;
    }

    await init();
};

// Menu option 01) View All Employees
function allEmployees() {
    const query = `SELECT id, first_name, last_name, manager_id, role_id, department_id FROM employee WHERE deleted_time is NULL;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.table(res);
        init();
    });
};

// // Menu option 02) Add Employee
// function xxxxxx() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('');
//         console.table(res);
//         init();
//     });
// };
// // Menu option 03) Remove Employee
// function xxxxxx() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('');
//         console.table(res);
//         init();
//     });
// };
// // Menu option 04) Update Employee Role
// function xxxxxx() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('');
//         console.table(res);
//         init();
//     });
// };
// // Menu option 05) Update Employee Manager
// function xxxxxx() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('');
//         console.table(res);
//         init();
//     });
// };
// // Menu option 06) Update Employee Department
// function xxxxxx() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('');
//         console.table(res);
//         init();
//     });
// };

// Menu option 07) View All Roles
function allRoles() {
    const query = `SELECT r.id, r.title, r.salary, d.name FROM role r, department d WHERE d.id = r.department_id and d.deleted_time is NULL;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL DEPARTMENTS');
        console.table(res);
        init();
    });
};

// // Menu option 08) Add Role
// function xxxxxx() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('');
//         console.table(res);
//         init();
//     });
// };

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

// // Menu option 10) Add Department
// function xxxxxx() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('');
//         console.table(res);
//         init();
//     });
// };

// // Menu option 11) View All Employees By Department
// function xxxxxx() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('');
//         console.table(res);
//         init();
//     });
// };

// // Menu option 12) View All Employees by Manager
// function xxxxxx() {
//     const query = ``;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('');
//         console.table(res);
//         init();
//     });
// };


// Function call to initialize app
init();