export interface Todo {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  tags: string[];
  color?: string;
  starred: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Statistics {
  total: number;
  completed: number;
  active: number;
  high_priority: number;
  overdue: number;
  starred: number;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3011';

export const todoAPI = {
  getAllTodos: async (sort?: string): Promise<Todo[]> => {
    const url = sort ? `${API_URL}/api/todos?sort=${sort}` : `${API_URL}/api/todos`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  getTodoById: async (id: number): Promise<Todo> => {
    const response = await fetch(`${API_URL}/api/todos/${id}`);
    if (!response.ok) throw new Error('Failed to fetch todo');
    return response.json();
  },

  getTodosByStatus: async (completed: boolean): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/api/todos/status/${completed}`);
    if (!response.ok) throw new Error('Failed to fetch todos by status');
    return response.json();
  },

  getTodosByPriority: async (priority: string): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/api/todos/priority/${priority}`);
    if (!response.ok) throw new Error('Failed to fetch todos by priority');
    return response.json();
  },

  getStarredTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/api/todos/starred`);
    if (!response.ok) throw new Error('Failed to fetch starred todos');
    return response.json();
  },

  searchTodos: async (query: string): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/api/todos/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search todos');
    return response.json();
  },

  getTodosByTag: async (tag: string): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/api/todos/tag/${tag}`);
    if (!response.ok) throw new Error('Failed to fetch todos by tag');
    return response.json();
  },

  getAllTags: async (): Promise<string[]> => {
    const response = await fetch(`${API_URL}/api/todos/tags`);
    if (!response.ok) throw new Error('Failed to fetch tags');
    return response.json();
  },

  getOverdueTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/api/todos/overdue`);
    if (!response.ok) throw new Error('Failed to fetch overdue todos');
    return response.json();
  },

  getTodosDueToday: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/api/todos/today`);
    if (!response.ok) throw new Error('Failed to fetch todos due today');
    return response.json();
  },

  getStatistics: async (): Promise<Statistics> => {
    const response = await fetch(`${API_URL}/api/todos/statistics`);
    if (!response.ok) throw new Error('Failed to fetch statistics');
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

  toggleStarred: async (id: number): Promise<Todo> => {
    const response = await fetch(`${API_URL}/api/todos/${id}/star`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to toggle starred');
    return response.json();
  },

  deleteTodo: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
  },
};
