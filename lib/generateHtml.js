const fs = require("fs");
const path = require("path");
const Manager = require("./Manager");
const srcDir = path.resolve(__dirname, "../src");

const render = (employees) => {
  const htmlRen = [];

  htmlRen.push(
    ...employees
      .filter((e) => e.getRole() === "Manager")
      .map((m) => renderManager(m).join(""))
  );
};

const renderManager = (m) => {
  let tmp = fs.readFileSync(path.resolve(srcDir, "manager.html"), "utf8");
  tmp = replacePlaceholders(tmp, "name", m.getName());
  tmp = replacePlaceholders(tmp, "role", m.getRole());
  tmp = replacePlaceholders(tmp, "email", m.getEmail());
  tmp = replacePlaceholders(tmp, "id", m.getId());
  tmp = replacePlaceholders(tmp, "officeNumber", m.getOfficeNumber());
  return tmp;
};

module.exports = render;
