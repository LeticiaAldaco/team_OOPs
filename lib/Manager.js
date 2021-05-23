const Employee = require("./Employee");

class Manager extends Employee {
  constructor(officeNumber) {
    super();
    this.officeNumber = officeNumber;
  }
  getRole() {
    return "Manager";
  }
  officeNumber() {
    return "officeNumber";
  }
}

module.exports = Manager;
