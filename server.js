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

// 4) function to navigate options
// Function to initialize app
async function init ()  {
    // console.log('Running program :)')
    let answer = await inquirer.prompt(mainMenu);

    switch (answer.menuCommand) {
        case '01) View All Employees':
            // console.log('Option1');
            await allEmployees();
            break;
        case '02) Add Employee':
            console.log('Option2');
            break;
        case '03) Remove Employee':
            console.log('Option3');
            break;
        case '04) Update Employee Role':
            console.log('Option4');
            break;
        case '05) Update Employee Manager':
            console.log('Option5');
            break;
        case '06) Update Employee Department':
            console.log('Option6');
            break;
        case '07) View All Roles':
            console.log('Option7');
            break;
        case '08) Add Role':
            console.log('Option8');
            break;
        case '09) View all Departments':
            console.log('Option9');
            break;
        case '10) Add Department':
            console.log('Option10');
            break;
        case '11) View All Employees By Department':
            console.log('Option11');
            break;
        case '12) View All Employees by Manager':
            console.log('Option12');
            break;
        case 'Quit':
            console.log('Option13');
            process.exit();
        default:
            break;
    }

    await init();
};

// 5) Employees
function allEmployees() {
    const query = `SELECT id, first_name, last_name, manager_id, role_id, department_id FROM employee WHERE deleted_time is NULL;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('VIEW ALL EMPLOYEES');
        console.table(res);
        init();
    });
};
// 6) Departments
// 7) Managers
// 8) Roles

// Function call to initialize app
init();