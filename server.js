// const express = require('express');
// Import and require mysql2

// 1) Require
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// const PORT = process.env.PORT || 3002;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// 2) Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// // Query database
// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Commands
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
'13) Quit'

// 3) questions from inquirer
const questions = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'command',
            message: 'What would you like to do?',
            choices: ['View All Employees','Add Employee','Remove Employee','Update Employee Role','Update Employee Manager','Update Employee Department','View All Roles','Add Role','View all Departments','Add Department','View All Employees By Department','View All Employees by Manager','Quit']
        },
        {
            type: 'input',
            message: "Which employee's role do you want to update?",
            name: 'name'
        },
        {
            type: 'input',
            message: 'Which role do you want to assign the selected employee?',
            name: 'id'
        },
        {
            type: 'input',
            message: "Who is the name of the department",
            name: 'nameDepartment'
        },
        {
            type: 'input',
            message: "Who is the name of the role",
            name: 'nameRole'
        },
        {
            type: 'input',
            message: "Who is the first name of the employee",
            name: 'nameFirst'
        },
        {
            type: 'input',
            message: "Who is the last name of the employee",
            name: 'nameLast'
        },
        {
            type: 'input',
            message: 'Enter office number:',
            name: 'officeNumber',
            when: (input) => input.role === "Manager",
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter engineer's github name:",
            when: (input) => input.role === "Engineer",
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter the intern's school:",
            when: (input) => input.role === "Intern",
        },
        {
            type: 'confirm',
            name: 'moreEmployees',
            message: 'Would you like to add more employees to your team?',
            default: false
        }
    ])
    .then (employeeResponse => {
        // takes users input to generate employee cards for HTML export
        let { name, id, email, role, officeNumber, github, school, moreEmployees } = employeeResponse; 
        let employee; 
        let employeeObject;

        if (role === "Manager") {
            employeeObject= new Manager (name, id, email, officeNumber);
            employee = generateManagerCard(employeeObject);
        }
        else if (role === "Engineer") {
            employeeObject = new Engineer (name, id, email, github);
            employee = generateEngrCard(employeeObject);

        } else if (role === "Intern") {
            employeeObject = new Intern (name, id, email, school);
            employee = generateInternCard(employeeObject);
        }

        teamMembers.push(employee); 

        // Keep cycling through questions prompt if more team members are needed
        if (moreEmployees) {
            return questions(); 
        } else {
            return teamMembers;
        }
    }) 
};

// 4) function to navigate options
// 5) Employees
// 6) Departments
// 7) Managers
// 8) Roles


// Function to initialize app
function init() {
    questions()
        .then(answers => {
            console.log(answers)
            //  writeToFile('./dist/index.html',answers);
        }
    );
}

// Function call to initialize app
init();