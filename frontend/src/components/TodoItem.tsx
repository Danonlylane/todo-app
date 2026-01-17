import React from 'react';
import { Todo } from '../services/todoAPI';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => todo.id && onToggle(todo.id)}
      />
      <div className="todo-content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
      </div>
      <button
        className="delete-btn"
        onClick={() => todo.id && onDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
