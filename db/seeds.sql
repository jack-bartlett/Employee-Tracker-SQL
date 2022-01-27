USE employeeDB;
INSERT INTO department(name)
VALUES 
    ("HR"),
    ("IT");

INSERT INTO role(title, salary, departmentID)
VALUES 
    ("HR person", 50000.00, 1),
    ("IT Manager", 80000.50, 2),
    ("IT specialist", 50000.00, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ("Bob", "Saget", 1, 2),
    ("John", "Smith", 2, NULL),
    ("Josh", "Smalls", 1, 2),
    ("Jack", "Bartlett", 1, 2),
    ("James", "Goodhand", 1, 2);
    


