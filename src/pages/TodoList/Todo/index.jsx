import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from './Todo.module.scss';

const Todo = ({ todos, removeTodo }) => {

  return todos.map((todo) => (
    <div className={styles.inerText} >
      <div className={styles.text} >{todo.text}</div>
      <div className={styles.icon}>
        <CloseIcon
          onClick={() => removeTodo(todo.id)}
          className={styles.deleteIcon}
        />
      </div>
    </div>
  ));
};

export default Todo;
