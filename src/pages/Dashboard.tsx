import React, { useState } from 'react';
import {
  Plus,
  ListTodo,
  CheckSquare,
  AlertTriangle,
  Clock,
  PieChart,
} from 'lucide-react';
import { useTodoStore } from '../store/todoStore';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { MetricsCard } from '../components/MetricsCard';
import { calculateMetrics } from '../utils/metrics';
import { Todo, TodoFormData } from '../types/todo';

export const Dashboard: React.FC = () => {
  const { todos, addTodo, removeTodo, toggleTodo, updateTodo } = useTodoStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const metrics = calculateMetrics(todos);

  const handleSubmit = (formData: TodoFormData) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, {
        ...formData,
        startDate: new Date(formData.startDate),
        dueDate: new Date(formData.dueDate),
      });
    } else {
      addTodo({
        ...formData,
        startDate: new Date(formData.startDate),
        dueDate: new Date(formData.dueDate),
      });
    }
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-800">Dashboard</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Tarefa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricsCard
          title="Total de Tarefas"
          value={metrics.total}
          icon={ListTodo}
          color="primary"
        />
        <MetricsCard
          title="Tarefas Concluídas"
          value={metrics.completed}
          icon={CheckSquare}
          color="success"
        />
        <MetricsCard
          title="Alta Prioridade"
          value={metrics.highPriority}
          icon={AlertTriangle}
          color="danger"
        />
        <MetricsCard
          title="Vencendo em Breve"
          value={metrics.dueSoon}
          icon={Clock}
          color="warning"
        />
        <MetricsCard
          title="Taxa de Conclusão"
          value={`${metrics.completionRate}%`}
          icon={PieChart}
          trend={metrics.completionTrend}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-emerald-800 mb-4">
            Distribuição por Categoria
          </h2>
          <div className="space-y-3">
            {Object.entries(metrics.categoryDistribution).map(([category, count]) => (
              <div key={category} className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize">
                      {category}
                    </span>
                    <span className="text-sm text-gray-500">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{
                        width: `${(count / metrics.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-emerald-800 mb-4">
            Resumo de Status
          </h2>
          <div className="relative pt-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Progresso Geral</span>
              <span className="text-sm font-medium">{metrics.completionRate}%</span>
            </div>
            <div className="flex h-3 mb-4 rounded-full bg-gray-200">
              <div
                className="bg-emerald-600 rounded-full"
                style={{ width: `${metrics.completionRate}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-600 font-medium">Concluídas</p>
                <p className="text-2xl font-semibold text-emerald-700">
                  {metrics.completed}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-600 font-medium">Pendentes</p>
                <p className="text-2xl font-semibold text-yellow-700">
                  {metrics.pending}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TodoForm
            initialData={
              editingTodo
                ? {
                    ...editingTodo,
                    startDate: editingTodo.startDate.toISOString().split('T')[0],
                    dueDate: editingTodo.dueDate.toISOString().split('T')[0],
                  }
                : undefined
            }
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingTodo(null);
            }}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={handleEdit}
          onDelete={removeTodo}
        />
      </div>
    </div>
  );
};