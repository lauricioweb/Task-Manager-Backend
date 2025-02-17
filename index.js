const express = require("express");
const app = express();
const router = require("./routes");
const connection = require("./src/database/connection");
const cors = require("cors");

const corsOptions = {
	origin: "http://localhost:5173", // A origem que você deseja permitir
};

require("./src/database/models/tasks");
require("./src/database/models/subtasks");

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

connection
  .authenticate()
  .then(() => {
    console.log("banco de dados conectado com sucesso!");
  })
  .catch((erro) => {
    console.log(erro);
  });

module.exports = app;
