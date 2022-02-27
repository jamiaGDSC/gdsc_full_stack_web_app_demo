const express = require("express");

const Todo = require("../models/todo");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.query.userId });
    res.json({ success: true, todos });
  } catch (err) {
    console.error(err);
    res.status(500).json("internal server error");
  }
});

router.post("/create", async (req, res) => {
  const { userId, description } = req.body;
  try {
    const newTodo = new Todo({
      userId,
      description,
    });
    await newTodo.save();
    const newTodos = await Todo.find({ userId });
    res.json({ success: true, newTodos });
  } catch (err) {
    console.error(err);
    res.status(500).json("internal server error");
  }
});

router.post("/complete", async (req, res) => {
  const { todoId, userId } = req.body;
  try {
    await Todo.findByIdAndUpdate(todoId, { isCompleted: true });
    const newTodos = await Todo.find({ userId });
    res.json({ success: true, newTodos });
  } catch (err) {
    console.error(err);
    res.status(500).json("internal server error");
  }
});

router.post("/remove", async (req, res) => {
  const { todoId, userId } = req.body;
  try {
    await Todo.findByIdAndDelete(todoId);
    const newTodos = await Todo.find({ userId });
    res.json({ success: true, newTodos });
  } catch (err) {
    console.error(err);
    res.status(500).json("internal server error");
  }
});

module.exports = router;
