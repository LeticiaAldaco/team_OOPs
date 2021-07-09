const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const generateHtml = require("./lib/generateHtml");
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

function createHtml() {
  const html = [];

  function mngrHtml(employee) {
    return `    
		<!-- Manager -->
		<div class="col s4 m4 l4 .center-align grey lighten-2">
		<div class="card center-align">
		<div class="blue darken-2 white-text">
	   <div> <h5>${employee.name}</h5></div>
	   <div><i class="material-icons">local_cafe</i><h6>Manager</h6></div>
	   </div>
	   <div>Employee ID: ${employee.id}
	   <div>Email: <a href="mailto:${employee.email}">${employee.email}</a></div>
	   <div>Office number: ${employee.officeNumber}</div>
	  
	   </div>
	</div>
	</div>	
		`;
  }

  function engrHtml(employee) {
    return `<!-- Engineer -->
		
			<div class="col s4 m4 l4 .center-align grey lighten-2">
				<div class="card center-align">
				<div class="blue darken-2 white-text">
			   <div> <h5>${employee.name}</h5></div>
			   <div><i class="material-icons">computer</i><h6>Engineer</h6></div>
			   </div>
			   <div>Employee ID: ${employee.id}
			   <div>Email: <a href="mailto:${employee.email}">${employee.email}</a></div>
			   <div>Github: <a href="https://github.com/${employee.github}">${employee.github}</a></div>
			   </div>
			</div>
			</div>
		
		`;
  }

  function intHtml(employee) {
    return `<!-- Intern -->
		<div class="col s4 m4 l4 .center-align grey lighten-2">
		<div class="card center-align">
		<div class="blue darken-2 white-text">
	   <div> <h5>${employee.name}</h5></div>
	   <div><i class="material-icons">school</i><h6>Intern</h6></div>
	   </div>
	   <div>Employee ID: ${employee.id}
	   <div>Email: <a href="mailto:${employee.email}">${employee.email}</a></div>
	   <div>School: ${employee.school}</div>
	   </div>
	</div>
	</div>`;
  }

  for (i = 0; i < employeeArr.length; i++) {
    let teamMember = employeeArr[i];
    // console.log(teamMember.getRole());
    if (teamMember.getRole() === "Manager") {
      html.push(mngrHtml(teamMember));
    } else if (teamMember.getRole() === "Engineer") {
      html.push(engrHtml(teamMember));
    } else {
      html.push(intHtml(teamMember));
    }
  }
  return html.join("");
}

function starterHtml() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <title>Team Profile</title>
</head>
<body>
    <div class=".center-align red lighten-4"><h2 style="text-align: center;" class="red lighten-4">Team Profile  Generator</h2></div>
	
			<div class="row">
				<!-- START OF TEAM MEMBER CARDS-->
	
				${createHtml()}
				
				<!-- END OF TEAM MEMBER CARDS-->
		
	</body>
	</html>`;
}

initializeQuestions();
