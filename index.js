const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ message: "Hello world" });
});

const port = process.env.PORT || 3333;
app.listen(port, process.env.IP, function() {
  console.log("The App server is running!");
  console.log(`Access http://localhost/${port}`);
  console.log("Hit ctrl + c to stop!");
});
