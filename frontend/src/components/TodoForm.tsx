import React, { useState } from 'react';
import { Plus, Calendar, Tag as TagIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoFormProps {
  onAdd: (title: string, description: string, priority: string, dueDate: string, tags: string[]) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, description, priority, dueDate, tags);
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      setDueDate('');
      setTags([]);
      setShowAdvanced(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none transition-colors"
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none transition-colors"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 mb-4"
          >
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none transition-colors resize-none"
              rows={3}
            />

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <TagIcon className="w-4 h-4" />
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-primary-900 dark:hover:text-primary-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {showAdvanced ? 'Less options' : 'More options'}
        </button>
        <button
          type="submit"
          className="ml-auto flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Todo
        </button>
      </div>
    </motion.form>
  );
};

export default TodoForm;
