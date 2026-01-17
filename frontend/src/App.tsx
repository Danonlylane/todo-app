import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { todoAPI, Todo } from './services/todoAPI';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoAPI.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Make sure the backend is running on port 3011.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string, description: string) => {
    try {
      setError(null);
      const newTodo = await todoAPI.createTodo({
        title,
        description,
        completed: false,
      });
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      setError(null);
      const todo = todos.find(t => t.id === id);
      if (todo) {
        const updatedTodo = await todoAPI.updateTodo(id, {
          ...todo,
          completed: !todo.completed,
        });
        setTodos(todos.map(t => t.id === id ? updatedTodo : t));
      }
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      setError(null);
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>

        {error && <div className="error-message">{error}</div>}

        <TodoForm onAdd={addTodo} />

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active ({todos.filter(t => !t.completed).length})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({todos.filter(t => t.completed).length})
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">No todos found</div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
