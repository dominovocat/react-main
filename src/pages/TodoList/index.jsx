import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import styles from "./TodoList.module.scss";



function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  return (
    <>
      <div className={styles.outer}>
        <h1 className={styles.h1}>Todo List</h1>
        <TodoForm onSubmit={addTodo} />
        <div className={styles.inerText}>
          <Todo todos={todos} removeTodo={removeTodo} />
        </div>
      </div>
    </>
  );
}

export default TodoList;
