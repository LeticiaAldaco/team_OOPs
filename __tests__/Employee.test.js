const { TestScheduler } = require("jest");
const Employee = require("../lib/Employee");

// jest.mock('../lib/Employee')

// test("Get employee information based off inquirer prompts", () => {
//   const employee = new Employee("Leti", 4325, "let@gmail.com", "Employee");

//   expect(employee.name).toEqual(expect.any(String));
//   expect(employee.id).toEqual(expect.any(Number));
//   expect(employee.email).toEqual(expect.any(String));
//   expect(employee.getRole()).toBe("Employee");
// });

// test if employee class returns an object
test("Can invoke employee constructor", () => {
  const employee = new Employee();
  expect(typeof employee).toBe("object");
});

// tests for constructor arguments
test("Test name parameter", () => {
  const name = "Leticia";
  const employee = new Employee(name);
  expect(employee.name).toBe(name);
});

test("Test id parameter", () => {
  const id = 1234;
  const employee = new Employee("Leticia", id);
  expect(employee.id).toBe(id);
});

test("Test email parameter", () => {
  const email = "leticialnay@gmail.com";
  const employee = new Employee("Leticia", 1234, email);
  expect(employee.email).toBe(email);
});

// tests for methods
test("Test name method", () => {
  const name = "Leticia";
  const e = new Employee(name);
  expect(e.getName()).toBe(name);
});

test("Test id method", () => {
  const id = 1234;
  const e = new Employee("Leticia", id);
  expect(e.getId()).toBe(id);
});

test("Test email method", () => {
  const email = "leticialnay@gmail.com";
  const e = new Employee("Leticia", 1234, email);
  expect(e.getEmail()).toBe(email);
});

test("Get role should return employee", () => {
  const value = "Employee";
  const e = new Employee("Leticia", 1234, "leticialnay@gmail.com");
  expect(e.getRole()).toBe(value);
});
