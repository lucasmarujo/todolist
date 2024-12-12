import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

export const Tasks: React.FC = () => {
  const { todos } = useTodoStore();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredTodos = todos.filter((todo) => {
    const statusMatch =
      filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'pending' && !todo.completed);
    const categoryMatch =
      categoryFilter === 'all' || todo.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-800">Tarefas</h1>

      <div className="flex gap-4 flex-wrap">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="p-2 border border-emerald-300 rounded-lg"
        >
          <option value="all">Todas</option>
          <option value="completed">Concluídas</option>
          <option value="pending">Pendentes</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border border-emerald-300 rounded-lg"
        >
          <option value="all">Todas as Categorias</option>
          <option value="work">Trabalho</option>
          <option value="personal">Pessoal</option>
          <option value="shopping">Compras</option>
          <option value="other">Outros</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="p-4 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{todo.title}</h3>
                  <p className="text-sm text-gray-600">{todo.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      todo.completed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {todo.completed ? 'Concluída' : 'Pendente'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};