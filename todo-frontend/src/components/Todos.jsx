import { useState, useEffect } from "react";

import { BiAddToQueue } from "react-icons/bi";

import Todo from "./Todo";

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch(
          `https://todo-api-production.up.railway.app/getAll?userId=${user._id}`
        );
        const data = await res.json();
        if (!data.success) {
          window.alert("Failed fetching Todos");
        }
        setTodos(data.todos);
      } catch (error) {
        console.log(error);
        window.alert("Server error");
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    try {
      const res = await fetch(
        "https://todo-api-production.up.railway.app/create",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id, description: newTodo }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        window.alert("Failed adding Todo");
      }
      setTodos(data.newTodos);
      setNewTodo("");
    } catch (error) {
      console.log(error);
      window.alert("Server error");
    }
  };

  return (
    <div className="todoContainer">
      <div className="newTodoWrapper">
        <input
          name="newTodo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add Item"
          className="newTodo"
        />
        <button className="addBtn" onClick={addTodo}>
          <BiAddToQueue className="addIcon" />
          Add
        </button>
      </div>
      {todos.map((todo) => (
        <Todo todo={todo} user={user} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default Todos;
