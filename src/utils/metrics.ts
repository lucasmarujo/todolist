import { Todo } from '../types/todo';

export const calculateMetrics = (todos: Todo[]) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;
  
  const highPriority = todos.filter((todo) => todo.priority === 'high').length;
  const dueSoon = todos.filter((todo) => {
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && !todo.completed;
  }).length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const previousCompletionRate = 65; // This would normally be calculated from historical data

  const categoryDistribution = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    completed,
    pending,
    highPriority,
    dueSoon,
    completionRate,
    completionTrend: {
      value: Math.abs(completionRate - previousCompletionRate),
      isPositive: completionRate >= previousCompletionRate,
    },
    categoryDistribution,
  };
};