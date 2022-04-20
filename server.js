const inquirer = require("inquirer");
const prompt = require("./config/prompts");
const connection = require("./config/connection");
const { addRolePrompt } = require("./config/prompts");


console.log('Welcome to Your Employee Tracking System');
mainMenu(); 

// Main Menu
function mainMenu() {
    inquirer.prompt(prompt.mainMenuPrompt).then(function(task) {
        switch (task.menu) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee Role":
                updateEmployeeRole();
                break;
            case "Quit Application":
                console.log("You have exited the application");
                createConnection.end

        }
    });
}
function viewAllDepartments() {
    connection.query("SELECT * FROM employeeDB.department", 
    function(err, res, fields) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });  
};

function viewAllRoles() {
    connection.query("SELECT * FROM employeeDB.role", 
    function(err, res, fields) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });  
};

function viewAllEmployees() {
    connection.query(`SELECT e.id, e.first_name AS fn, e.last_name AS ln, r.title AS title, d.name, r.salary, coalesce(m.first_name, '') AS Manager_fn, coalesce(m.last_name, '') AS Manager_ln FROM employeeDB.employee e
    JOIN employeeDB.role r ON e.role_id = r.id
    JOIN employeeDB.department d ON r.departmentID = d.id
    LEFT JOIN employeeDB.employee m ON e.manager_id = m.id`, 
    function(err, res, fields) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });  
};

function addDepartment() {
    inquirer.prompt(prompt.addDepartmentPrompt).then(function (answer) {
        let query = "INSERT INTO employeeDB.department (name) VALUES (?)";
        connection.execute(query, [answer.department], function (err, res) {
            if (err) throw err;
            console.table(res); 
            mainMenu();   
        }); 
    });
};
        

function addRole() {
    let query = "SELECT id, name FROM employeeDB.department";
    connection.query(query, function (err, res) {
        let departments = res.map(function(x) { return {name: x.name, value: x.id} });
        prompt.addRolePrompt[2].choices = departments;
        inquirer.prompt(prompt.addRolePrompt).then(function (answer) {
            let query = "INSERT INTO employeeDB.role (title, salary, departmentID) VALUES (?,?,?)";
            connection.execute(query, [answer.role, answer.roleSalary, answer.departmentId], function (err, res) {
                if (err) throw err;
                console.log(`${answer.role} has been added`);
                mainMenu();  
            });
        }); 
    });
};

function addEmployee() {
    let query = "SELECT id, title FROM employeeDB.role";
    connection.query(query, function (err, res) {
        let roles = res.map(function(x) { return {name: x.title, value: x.id} });
        prompt.addEmployeePrompt[2].choices = roles;

        let query = "SELECT id, first_name, last_name FROM employeeDB.employee";
        connection.query(query, function (err, res) {
            let employees = res.map(function(x) { return {name: `${x.first_name} ${x.last_name}`, value: x.id} });
            
                employees.push({name: "none", value: null});
            prompt.addEmployeePrompt[3].choices = employees;
            inquirer.prompt(prompt.addEmployeePrompt).then(function (answer) {
                let query = "INSERT INTO employeeDB.employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
                connection.execute(query, [answer.firstName, answer.lastName, answer.role, answer.manager], function (err, res) {
                    if (err) throw err;
                    console.log(`${answer.firstName} has been added`);
                    mainMenu();  
                });
            }); 
        });
    });
}

function updateEmployeeRole() {
    let query = "SELECT id, title FROM employeeDB.role";
    connection.query(query, function (err, res) {
        let roles = res.map(function(x) { return {name: x.title, value: x.id} });
        prompt.updateEmployeeRolePrompt[1].choices = roles;

        let query = "SELECT id, first_name, last_name FROM employeeDB.employee";
        connection.query(query, function (err, res2) {
            let employees = res2.map(function(x) { return {name: `${x.first_name} ${x.last_name}`, value: x.id} });
            prompt.updateEmployeeRolePrompt[0].choices = employees;
            inquirer.prompt(prompt.updateEmployeeRolePrompt).then(function (answer) {
                let query = "UPDATE employeeDB.employee SET role_id = ? WHERE id = ?";
                connection.execute(query, [answer.role, answer.update], function (err, res) {
                    if (err) throw err;
                    console.log(`${employees.find( (x) => x.value == answer.update ).name} has been updated to ${roles.find( (x) => x.value == answer.role ).name}` );
                    mainMenu();
                });
            });
        });
    });
    
};