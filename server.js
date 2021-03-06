const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const sequelize = require('./config/connection');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'tuesday3',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Command options for Main Menu
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
        '09) Remove Role',
        '10) View all Departments',
        '11) Add Department',
        '12) Remove Department',
        '13) View All Employees By Department',
        '14) View All Employees by Manager',
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
        case '09) Remove Role':
            await removeRole();
            break;
        case '10) View all Departments':
            await allDepartments();
            break;
        case '11) Add Department':
            await addDepartment();
            break;
        case '12) Remove Department':
            await removeDepartment();
            break;
        case '13) View All Employees By Department':
            await allEmployeesByDept();
            break;
        case '14) View All Employees by Manager':
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
        console.log('\n');
        console.table(res);
        init();
    });
};

// Menu option 02) Add Employee
async function addEmployee() {
    console.log('\n');
    console.log('ADDING EMPLOYEE');
    console.log('\n');
    // prompt user for first and last name
    const addname = await inquirer.prompt(namePrompt());

    // Provide output from role table for the user to select a role for new employee 
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

        // Set new employee's role based on response from user
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        // Provide output from employee table for the user to select a manager for new employee
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

            // Set new employee's manager based on response from user
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
                        continue;
                    }
                }
            }

            // Insert all input for new employee into employee table
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
                    console.log('\n');
                    console.log('EMPLOYEE ADDED');
                    console.log('\n');
                    init();
                }
            );
        });
    });
};

// Prompt for Employee full name
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

// Menu option 03) Remove Employee
async function removeEmployee() {
    console.log('\n');
    console.log('REMOVING EMPLOYEE');
    console.log('\n');

    // Provide output from employee table for the user to select a employee to remove
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

        const employeeId = employee.split(' ')[0];
        
        const query = `UPDATE employee SET deleted_time = CURRENT_TIMESTAMP WHERE id =${employeeId}`;

        // Remove selected employee
        db.query(query, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.log('EMPLOYEE REMOVED');
            console.log('\n');
            init();
        });
    });
}; 

// Menu option 04) Update Employee Role
async function updateEmployeeRole() {
    console.log('\n');
    console.log('UPDATE EMPLOYEE ROLE');
    console.log('\n');

    // Provide output from employee table for the user to select a employee to update
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
        
        // Use employee_id from inquirer.prompt to use in UPDATE query
        const employeeId = employee.split(' ')[0];
        
        // Provide output from role table for the user to select a new role
        db.query('SELECT * FROM role WHERE deleted_time is NULL;', async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => `${res.id} ${res.title}`);
            choices.push('none');
            let { role } = await inquirer.prompt([
                {
                    name: 'role',
                    type: 'list',
                    choices: choices,
                    message: 'Choose the new role: '
                }
            ]);

            // Use role_id from inquirer.prompt to use in UPDATE query
            const roleId = role.split(' ')[0];
            const query = `UPDATE employee SET role_id = ${roleId} WHERE id =${employeeId}`;

            // Update selected employee's role
            db.query(query, (err, res) => {
                if (err) throw err;
                console.log('\n');
                console.log('EMPLOYEE ROLE UPDATED');
                console.log('\n');
                init();
            });
        });
    });
};

// Menu option 05) Update Employee Manager
async function updateEmployeeManager() {
    console.log('\n');
    console.log('UPDATE EMPLOYEE MANAGER');
    console.log('\n');

    // Provide output from employee table for the user to select a employee to update
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
        
       // Use employee_id from inquirer.prompt to use in UPDATE query
       const employeeId = employee.split(' ')[0];
        
        // Provide output from employee table for the user to select a new manager
        db.query('SELECT * FROM employee WHERE deleted_time is NULL;', async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => `${res.id}  ${res.first_name} ${res.last_name}`);
            choices.push('none');
            let { employee } = await inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    choices: choices,
                    message: 'Choose the new manager: '
                }
            ]);

            // Use manager_id from inquirer.prompt to use in UPDATE query
            const managerId = employee.split(' ')[0];
            
            const query = `UPDATE employee SET manager_id = ${managerId} WHERE id =${employeeId}`;

            // Update selected employee's manager
            db.query(query, (err, res) => {
                if (err) throw err;
                console.log('\n');
                console.log('EMPLOYEE MANAGER UPDATED');
                console.log('\n');
                init();
            });
        });
    });
};

// Menu option 06) Update Employee Department
async function updateEmployeeDept() {
    console.log('\n');
    console.log('UPDATE EMPLOYEE DEPARTMENT');
    console.log('\n');

    // Provide output from employee table for the user to select a employee to update
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
        
       // Use employee_id from inquirer.prompt to use in UPDATE query
       const employeeId = employee.split(' ')[0];
        
        // Provide output from department table for the user to select a new department
        db.query('SELECT * FROM department WHERE deleted_time is NULL;', async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => `${res.id}  ${res.name}`);
            choices.push('none');
            let { department } = await inquirer.prompt([
                {
                    name: 'department',
                    type: 'list',
                    choices: choices,
                    message: 'Choose the new manager: '
                }
            ]);

            // Use employee_id from inquirer.prompt to use in UPDATE query
            const departmentId = department.split(' ')[0];
            const query = `UPDATE employee SET department_id = ${departmentId} WHERE id =${employeeId}`;

            // Update selected employee's department
            db.query(query, (err, res) => {
                if (err) throw err;
                console.log('\n');
                console.log('EMPLOYEE DEPARTMENT UPDATED');
                console.log('\n');
                init();
            });
        });
    });
};

// Menu option 07) View All Roles
function allRoles() {
    const query = `SELECT r.id, r.title as role_title, r.salary, d.name as department_name FROM role r, department d WHERE d.id = r.department_id and r.deleted_time is NULL;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL ROLES');
        console.log('\n');
        console.table(res);
        init();
    });
};

// Menu option 08) Add Role
async function addRole() {
    console.log('\n');
    console.log('ADDING ROLE');
    console.log('\n');
    // Prompt user for role title & salary for
    const addTitle = await inquirer.prompt(rolePrompt());
    const addSalary = await inquirer.prompt(salaryPrompt());

    // Provide output from role table for the user to select a role for new employee 
    db.query('SELECT * FROM department;', async (err, res) => {
        if (err) throw err;
        const { department } = await inquirer.prompt([
            {
                name: 'department',
                type: 'list',
                choices: () => res.map(res => res.name),
                message: 'What department does the role belong to?: '
            }
        ]);

        // Set new role's department based on response from user
        let deptId;
        for (const row of res) {
            if (row.name === department) {
                deptId = row.id;
                continue;
            }
        }
        console.log(deptId);
        console.log(addTitle.title);
        console.log(addSalary.salary);

        // Insert all input for new role into role table
        db.query(
            'INSERT INTO role SET ?',
            {
                title: addTitle.title,
                salary: addSalary.salary,
                department_id: deptId
            },
            (err, res) => {
                if (err) throw err;
                console.log('\n');
                console.log('EMPLOYEE ADDED');
                console.log('\n');
                init();
            }
        );
    });
};

// Function to prompt for role title
function rolePrompt() {
    return ([
        {
            name: "title",
            type: "input",
            message: "Enter the title for the new role: "
        }
    ]);
}
// Function to prompt for role salary
function salaryPrompt() {
    return ([
        {
            name: "salary",
            type: "input",
            message: "Enter the salary for the new role:"
        }
    ]);
}

// Menu option 09) Remove Role
async function removeRole() {
    console.log('\n');
    console.log('REMOVING ROLE');
    console.log('\n');

    // Provide output from employee table for the user to select a employee to remove
    db.query('SELECT * FROM role WHERE deleted_time is NULL;', async (err, res) => {
        if (err) throw err;
        let choices = res.map(res => `${res.id} ${res.title}`);
        choices.push('none');
        let { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: choices,
                message: 'Choose the role: '
            }
        ]);

        const roleId = role.split(' ')[0];
        
        const query = `UPDATE role SET deleted_time = CURRENT_TIMESTAMP WHERE id =${roleId}`;

        // Remove selected employee
        db.query(query, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.log('ROLE REMOVED');
            console.log('\n');
            init();
        });
    });
};

// Menu option 10) View all Departments
function allDepartments() {
    const query = `SELECT id, name FROM department WHERE deleted_time is NULL;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL DEPARTMENTS');
        console.log('\n');
        console.table(res);
        init();
    });
};

// Menu option 11) Add Department
async function addDepartment() {
    console.log('\n');
    console.log('ADDING DEPARTMENT');

    // Prompt user for department name
    const adddept = await inquirer.prompt(deptPrompt());
    const deptName = adddept.name;
        
    const query = `INSERT INTO department (name) VALUES (${deptName})`;

    // Insert all input for new department into department table
    db.query(
        'INSERT INTO department SET ?',
        {
            name: deptName
        },
        (err, res) => {
            if (err) throw err;
            init();
        }
    );

    console.log('\n');
    console.log('DEPARTMENT ADDED');
    console.log('\n');
};

// Function to prompt for department name
function deptPrompt() {
    return ([
        {
            name: "name",
            type: "input",
            message: "Enter the department name: "
        }
    ]);
}

// Menu option 12) Remove Department
async function removeDepartment() {
    console.log('\n');
    console.log('REMOVING DEPARTMENT');
    console.log('\n');

    // Provide output from department table for the user to select a department to remove
    db.query('SELECT * FROM department WHERE deleted_time is NULL;', async (err, res) => {
        if (err) throw err;
        let choices = res.map(res => `${res.id} ${res.name}`);
        choices.push('none');
        let { department } = await inquirer.prompt([
            {
                name: 'department',
                type: 'list',
                choices: choices,
                message: 'Choose the department: '
            }
        ]);
        
        const departmentId = department.split(' ')[0];

        const query = `UPDATE department SET deleted_time = CURRENT_TIMESTAMP WHERE id =${departmentId}`;

        // Remove selected department
        db.query(query, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.log('DEPARTMENT REMOVED');
            console.log('\n');
            init();
        });
    });
};

// Menu option 13) View All Employees By Department
function allEmployeesByDept() {
    console.log('\n');
    console.log('VIEW ALL EMPLOYEES BY DEPARTMENT');
    console.log('\n');

    // Provide output from employee table for only subset of employees
    db.query('SELECT * FROM department WHERE deleted_time is NULL;', async (err, res) => {
        if (err) throw err;
        let choices = res.map(res => `${res.id}  ${res.name}`);
        choices.push('none');
        let { department } = await inquirer.prompt([
            {
                name: 'department',
                type: 'list',
                choices: choices,
                message: 'Choose the new manager: '
            }
        ]);

        // Use department_id from inquirer.prompt to use in select query
        const departmentId = department.split(' ')[0];
        
        const query = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS Name, role.title AS Title, role.salary AS Salary, CONCAT(m.first_name, " ", m.last_name) AS Manager, department.name AS Department FROM employee e INNER JOIN role ON role_id=role.id INNER JOIN employee m ON e.manager_id=m.id INNER JOIN department ON role.department_id=department.id and e.deleted_time is NULL WHERE e.department_id = ${departmentId} order by e.id;`;
        // Output all Employees for selected Manager
        db.query(query, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.log('VIEW ALL EMPLOYEES BY DEPARTMENT');
            console.log('\n');
            console.table(res);
            init();
        });
    });
};

// Menu option 14) View All Employees by Manager
function allEmployeesByManager() {
    console.log('\n');
    console.log('VIEW ALL EMPLOYEES BY MANAGER');
    console.log('\n');

    // Provide output from employee table for only subset of employees
    db.query('SELECT * FROM employee WHERE deleted_time is NULL;', async (err, res) => {
        if (err) throw err;
        let choices = res.map(res => `${res.id}  ${res.first_name} ${res.last_name}`);
        choices.push('none');
        let { employee } = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: choices,
                message: 'Choose the new manager: '
            }
        ]);

        // Use manager_id from inquirer.prompt to use in select query
        const managerId = employee.split(' ')[0];
        
        const query = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS Name, role.title AS Title, role.salary AS Salary, CONCAT(m.first_name, " ", m.last_name) AS Manager, department.name AS Department FROM employee e INNER JOIN role ON role_id=role.id INNER JOIN employee m ON e.manager_id=m.id INNER JOIN department ON role.department_id=department.id and e.deleted_time is NULL WHERE e.manager_id = ${managerId} order by e.id;`;
        // Output all Employees for selected Manager
        db.query(query, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.log('VIEW ALL EMPLOYEES BY MANAGER');
            console.log('\n');
            console.table(res);
            init();
        });
    });
};


// Function call to initialize app
init();