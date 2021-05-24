const inquirer = require("inquirer");
const { type } = require("os");
const Employee = require("./lib/Employee");

const baseQuestions = [
  {
    type: "text",
    name: "name",
    message: "What is the employees name?",
  },
  {
    type: "number",
    name: "id",
    message: "What is their id?",
  },
  {
    type: "text",
    name: "email",
    message: "What is their email address?",
  },
];

const initializeQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeType",
        message: "Choose an employee type",
        choices: ["manager", "engineer", "intern"],
      },
    ])
    .then((responses) => {
      switch (responses.employeeType) {
        case "manager":
          createManager();
          break;
        case "engineer":
          createEngineer();
          break;
        case "intern":
          createIntern();
          break;
      }
    });
};
const createManager = () => {
  inquirer
    .prompt([
      ...baseQuestions,
      {
        type: "number",
        name: "officeNumber",
        message: "Enter their office number",
      },
    ])
    .then((responses) => {
      console.log(responses);
      addEmployee();
    });
};
const createEngineer = () => {
  inquirer
    .prompt([
      ...baseQuestions,
      {
        type: "input",
        name: "github",
        message: "Enter their github username",
      },
    ])
    .then((responses) => {
      console.log(responses);
      addEmployee();
    });
};
const createIntern = () => {
  inquirer
    .prompt([
      ...baseQuestions,
      {
        type: "input",
        name: "school",
        message: "Enter what school they attended",
      },
    ])
    .then((responses) => {
      console.log(responses);
      addEmployee();
    });
};
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add another employee?",
      },
    ])
    .then((responses) => {
      if (responses.addEmployee) {
        initializeQuestions();
      }
    });
};
initializeQuestions();
