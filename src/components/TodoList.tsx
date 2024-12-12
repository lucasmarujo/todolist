import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3 flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="mt-1 w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <div className="flex-1">
              <h3
                className={`font-medium ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
              )}
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span className={getPriorityColor(todo.priority)}>
                  {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                </span>
                <span>{new Date(todo.startDate).toLocaleDateString()}</span>
                <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                <span className="capitalize">{todo.category}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onEdit(todo)}
              className="text-emerald-600 hover:text-emerald-700"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};