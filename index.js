const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateHtml = require("./src/generateHtml");
const fs = require("fs");
const employeeArr = [];

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
      const newManager = new Manager(
        responses.name,
        responses.id,
        responses.email,
        responses.officeNumber
      );
      employeeArr.push(newManager);
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
      const newEngineer = new Engineer(
        responses.name,
        responses.id,
        responses.email,
        responses.github
      );
      employeeArr.push(newEngineer);
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
      const newIntern = new Intern(
        responses.name,
        responses.id,
        responses.email,
        responses.school
      );
      employeeArr.push(newIntern);
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
      } else {
        fs.writeFileSync("./dist/index.html", generateHtml());
      }
    });
};
initializeQuestions();
