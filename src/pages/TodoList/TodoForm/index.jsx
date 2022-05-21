import React, { useState, useEffect, useRef } from 'react';
import styles from './TodoForm.module.scss';

function TodoForm(props) {
  const [input, setInput] = useState();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
        <>
          <input
            placeholder='Add a task'
            value={input}
            onChange={handleChange}
            name='text'
            className={styles.todoInput}
            ref={inputRef}
          />
          <button onClick={handleSubmit} className={styles.todoButton}>
            Add task
          </button>
        </>
    </form>
  );
}

export default TodoForm;