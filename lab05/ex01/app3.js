import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose"; // <-- Add this

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect(
    "mongodb://user:user@localhost:27017/AGH?authSource=AGH&readPreference=primary&ssl=false&directConnection=true",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    department: String,
  },
  { collection: "students" }
);

const Student = mongoose.model("Student", studentSchema);

app.set("views", __dirname + "/views"); // Files with views can be found in the 'views' directory
app.set("view engine", "pug"); // Use the 'Pug' template system
app.locals.pretty = app.get("env") === "development"; // The resulting HTML code will be indented in the development environment

/* ************************************************ */

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

/* ******** */
/* "Routes" */
/* ******** */

// GET route for all students or a specific department
app.get("/:department?", async function (request, response) {
  const department = request.params.department;
  let students;
  if (department) {
    students = await Student.find({ department: department }).exec();
  } else {
    students = await Student.find({}).exec();
  }
  response.render("index", { students }); // Send the students array to the 'index' view
});

// POST route
app.post("/", function (request, response) {
  const name = request.body.name;
  response.render("hello", { name });
});

// GET /submit route
app.get("/submit", function (request, response) {
  const name = request.query.name;
  response.render("hello", { name });
});

/* ************************************************ */

app.listen(8000, function () {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});
