export interface Todo {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3011';

export const todoAPI = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/api/todos`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  getTodoById: async (id: number): Promise<Todo> => {
    const response = await fetch(`${API_URL}/api/todos/${id}`);
    if (!response.ok) throw new Error('Failed to fetch todo');
    return response.json();
  },

  createTodo: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  },

  updateTodo: async (id: number, todo: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },

  deleteTodo: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
  },
};
