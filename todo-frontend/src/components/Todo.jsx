import { useState } from "react";

import { AiOutlineCheckSquare, AiFillDelete } from "react-icons/ai";

const Todo = ({ todo, user, setTodos }) => {
  const onDelete = async () => {
    try {
      const res = await fetch(
        "https://todo-api-production.up.railway.app/remove",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            todoId: todo._id,
          }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        window.alert("Failed fetching Todos");
      }
      setTodos(data.newTodos);
    } catch (error) {
      console.log(error);
      window.alert("Server error");
    }
  };

  console.log({ user, todo });

  const onComplete = async () => {
    try {
      const res = await fetch(
        "https://todo-api-production.up.railway.app/complete",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            todoId: todo._id,
          }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        window.alert("Failed fetching Todos");
      }
      setTodos(data.newTodos);
    } catch (error) {
      console.log(error);
      window.alert("Server error");
    }
  };

  return (
    <div className="todo">
      <div>{todo.description}</div>
      <div>
        {!todo.isCompleted && (
          <span className="completeBtn" onClick={onComplete}>
            <AiOutlineCheckSquare />
          </span>
        )}
        <span className="deleteBtn" onClick={onDelete}>
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
};

export default Todo;
