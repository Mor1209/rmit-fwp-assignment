const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("heres");
  res.json({ message: "api is working" });
});

PORT_NUMBER = 3001;
app.listen(PORT_NUMBER);
