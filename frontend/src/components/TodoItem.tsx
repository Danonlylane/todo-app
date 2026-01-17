import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trash2, Calendar, Tag, Edit } from 'lucide-react';
import { Todo } from '../services/todoAPI';
import { format } from 'date-fns';
import { useLanguage } from '../i18n/LanguageContext';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onStar: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

const priorityColors = {
  HIGH: 'border-red-500 bg-red-50 dark:bg-red-900/20',
  MEDIUM: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
  LOW: 'border-green-500 bg-green-50 dark:bg-green-900/20',
};

const priorityBadgeColors = {
  HIGH: 'bg-red-500 text-white',
  MEDIUM: 'bg-yellow-500 text-white',
  LOW: 'bg-green-500 text-white',
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onStar, onEdit }) => {
  const { t } = useLanguage();
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`
        group relative p-4 rounded-lg border-l-4 transition-all duration-200
        ${priorityColors[todo.priority]}
        ${todo.completed ? 'opacity-60' : ''}
        bg-white dark:bg-gray-800 shadow-sm hover:shadow-md
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => todo.id && onToggle(todo.id)}
          className="mt-1 flex-shrink-0"
        >
          <div className={`
            w-5 h-5 rounded border-2 transition-all duration-200
            ${todo.completed
              ? 'bg-primary-500 border-primary-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
            }
            flex items-center justify-center
          `}>
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round"
                   strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`
              text-lg font-medium transition-all duration-200
              ${todo.completed
                ? 'line-through text-gray-400 dark:text-gray-500'
                : 'text-gray-900 dark:text-gray-100'
              }
            `}>
              {todo.title}
            </h3>

            {/* Priority Badge */}
            <span className={`
              px-2 py-0.5 text-xs font-semibold rounded
              ${priorityBadgeColors[todo.priority]}
            `}>
              {todo.priority}
            </span>
          </div>

          {todo.description && (
            <p className={`
              text-sm mb-2 transition-all duration-200
              ${todo.completed
                ? 'line-through text-gray-400 dark:text-gray-500'
                : 'text-gray-600 dark:text-gray-400'
              }
            `}>
              {todo.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            {todo.dueDate && (
              <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 font-semibold' : ''}`}>
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(todo.dueDate), 'MMM dd, yyyy')}</span>
                {isOverdue && <span className="ml-1 text-red-500">⚠️ {t('overdueWarning')}</span>}
              </div>
            )}

            {todo.tags && todo.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <div className="flex gap-1">
                  {todo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-gray-400 hover:text-blue-500 rounded-lg transition-all duration-200"
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            onClick={() => todo.id && onStar(todo.id)}
            className={`
              p-2 rounded-lg transition-all duration-200
              ${todo.starred
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-400 hover:text-yellow-500'
              }
            `}
          >
            <Star className={`w-5 h-5 ${todo.starred ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => todo.id && onDelete(todo.id)}
            className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItem;
