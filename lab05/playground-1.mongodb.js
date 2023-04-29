// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("AGH");

// Create a new document in the collection.
db.getCollection("students").insertMany([
  {
    fname: "Jan",
    lname: "Kowalski",
    department: "IET",
  },
  {
    fname: "Anna",
    lname: "Nowak",
    department: "G",
  },
  {
    fname: "Piotr",
    lname: "Zieliński",
    department: "H",
  },
  {
    fname: "Magdalena",
    lname: "Wiśniewska",
    department: "EAIiE",
  },
  {
    fname: "Krzysztof",
    lname: "Pawlak",
    department: "WMN",
  },
  {
    fname: "Krzysztof",
    lname: "Jan",
    department: "WMN",
  },
  {
    fname: "Krzysztof",
    lname: "Markiewski",
    department: "WMN",
  },
  {
    fname: "Sebastian",
    lname: "Kowal",
    department: "IET",
  },
  {
    fname: "Marcin",
    lname: "Solewski",
    department: "IET",
  },
]);

const studentsFromIET = db
  .getCollection("students")
  .find({ department: "IET" });

console.log(`IET students: ${studentsFromIET}`);
