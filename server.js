const inquirer = require("inquirer");
const db = require(".db");
const prompt = require("./config/prompts");
const connection = require("./config/connection");

// const employee = require('./constructor/employee');
// const role = require('./constructor/role');
// const department = require('./constructor/department');

const PORT = process.env.PORT || 3001;
// const app = express();


mainMenu(); 
// {console.log('Welcome to Your Employee Tracking System')};

// Main Menu
function mainMenu() {
    inquirer.prompt(prompt.mainMenu).then(function({task}) {
        switch (task) {
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

function viewAllDepartments() {
    connection.query("SELECT * FROM departments", 
    function(err, res) {
    if (err) throw err;
    console.table(res);
  });

    mainMenu();
};

function viewAllRoles() {


    mainMenu();
};

function viewAllEmployees() {


    mainMenu();
};

function addDepartment() {


    mainMenu();
};

function addRole() {


    mainMenu();
};

function addEmployee() {


    viewAllEmployees();
};

function updateEmployeeRole() {


    viewAllRoles();
};

// function quit() {

// }
        
            

};


