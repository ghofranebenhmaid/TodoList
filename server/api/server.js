const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const db = require("./dbConfig");

const api = express();

api.use(cors());
api.use(helmet());
api.use(express.json());

api.get("/", (req, res) => {
  res.send("Welcome to the app server!!!");
});

api.get("/todos", async (req, res) => {
  //! Get all todos
  try {
    const todos = await db("todos");
    res.json(todos);
  } catch (err) {
    console.log(err);
  }
});

api.get("/todos/:id", async (req, res) => {
  //! Get  todo by ID
  const { id } = req.params;

  try {
    const currentTodo = await db("todos").where({ id });
    currentTodo.length === 0
      ? res.status(404).json({ message: "Todo not found" })
      : res.status(200).json(currentTodo);
  } catch (err) {
    console.log(err);
  }
});

api.post("/todos", async (req, res) => {
  //! POST all todos
  const { message } = req.body;

  if (!message) {
    return res
      .status(400)
      .json({ message: "You must include a message in your request." });
  }
  try {
    await db("todos").insert({ message });
    res.status(201).json({ message: "Todo successfully stored!" });
  } catch (error) {
    console.log(error);
  }
});

api.put("/todos/:id", async (req, res) => {
  //! UPDATE a todo
  const { id } = req.params;
  const { message } = req.body;
  if (!message) {
    return res
      .status(400)
      .json({ message: "You must include a message in your request." });
  }

  try {
    await db("todos").where({ id }).update({ message });
    res.status(200).json({ message: "Update Successful!" });
  } catch (error) {
    console.log(error);
  }
});

api.delete("/todos/:id", async (req, res) => {
  //! DELETE a todo
  const { id } = req.params;

  try {
    await db("todos").where({ id }).del();
    res.status(200).json({ message: "Delete Successful!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = api;
