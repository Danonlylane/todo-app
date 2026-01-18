import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search, Moon, Sun } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import StatsPanel from './components/StatsPanel';
import LanguageSwitcher from './components/LanguageSwitcher';
import { todoAPI, Todo, Statistics } from './services/todoAPI';
import { useLanguage } from './i18n/LanguageContext';

type FilterType = 'all' | 'active' | 'completed' | 'starred' | 'high' | 'today' | 'overdue';

function App() {
  const { t } = useLanguage();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoAPI.getAllTodos('priority');
      setTodos(data);
    } catch (err) {
      setError(t('errorLoad'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await todoAPI.getStatistics();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch statistics', err);
    }
  };

  const addTodo = async (title: string, description: string, priority: string, dueDate: string, tags: string[]) => {
    try {
      setError(null);
      const newTodo = await todoAPI.createTodo({
        title,
        description,
        completed: false,
        priority: priority as 'LOW' | 'MEDIUM' | 'HIGH',
        dueDate: dueDate || undefined,
        tags,
        starred: false,
      });
      setTodos([newTodo, ...todos]);
      fetchStats();
    } catch (err) {
      setError(t('errorAdd'));
      console.error(err);
    }
  };

  const updateTodo = async (title: string, description: string, priority: string, dueDate: string, tags: string[]) => {
    if (!editingTodo || !editingTodo.id) return;

    try {
      setError(null);
      const updatedTodo = await todoAPI.updateTodo(editingTodo.id, {
        ...editingTodo,
        title,
        description,
        priority: priority as 'LOW' | 'MEDIUM' | 'HIGH',
        dueDate: dueDate || undefined,
        tags,
      });
      setTodos(todos.map(t => t.id === editingTodo.id ? updatedTodo : t));
      setEditingTodo(null);
      fetchStats();
    } catch (err) {
      setError(t('errorUpdate'));
      console.error(err);
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const cancelEdit = () => {
    setEditingTodo(null);
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
        fetchStats();
      }
    } catch (err) {
      setError(t('errorUpdate'));
      console.error(err);
    }
  };

  const toggleStar = async (id: number) => {
    try {
      setError(null);
      const updatedTodo = await todoAPI.toggleStarred(id);
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
      fetchStats();
    } catch (err) {
      setError(t('errorStar'));
      console.error(err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      setError(null);
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
      fetchStats();
    } catch (err) {
      setError(t('errorDelete'));
      console.error(err);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const results = await todoAPI.searchTodos(query);
        setTodos(results);
      } catch (err) {
        console.error('Search failed', err);
      }
    } else {
      fetchTodos();
    }
  };

  const applyFilter = async (newFilter: FilterType) => {
    setFilter(newFilter);
    setSearchQuery('');
    try {
      setLoading(true);
      let data: Todo[] = [];

      switch (newFilter) {
        case 'active':
          data = await todoAPI.getTodosByStatus(false);
          break;
        case 'completed':
          data = await todoAPI.getTodosByStatus(true);
          break;
        case 'starred':
          data = await todoAPI.getStarredTodos();
          break;
        case 'high':
          data = await todoAPI.getTodosByPriority('HIGH');
          break;
        case 'today':
          data = await todoAPI.getTodosDueToday();
          break;
        case 'overdue':
          data = await todoAPI.getOverdueTodos();
          break;
        default:
          data = await todoAPI.getAllTodos('priority');
      }

      setTodos(data);
    } catch (err) {
      setError('Failed to filter todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTodos = searchQuery
    ? todos
    : [...todos].sort((a, b) => {
        // 未完成的排在前面，已完成的排在后面
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        // 如果完成状态相同，按 ID 降序排列（新的在前）
        return (b.id || 0) - (a.id || 0);
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              ✨ {t('appTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('appSubtitle')}
            </p>
          </div>
          <div className="flex gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Statistics */}
        <StatsPanel stats={stats} />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded">
            {error}
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'active', 'completed', 'starred', 'high', 'today', 'overdue'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => applyFilter(f)}
                className={`
                  px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${filter === f
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {t(f as any) || f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Add Todo Form */}
        <TodoForm
          onAdd={addTodo}
          onUpdate={updateTodo}
          onCancel={cancelEdit}
          editingTodo={editingTodo}
        />

        {/* Todo List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('loading')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredTodos.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {searchQuery ? t('noMatching') : t('noTodos')}
                  </p>
                </div>
              ) : (
                filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onStar={toggleStar}
                    onEdit={startEdit}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
