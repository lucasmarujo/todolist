export interface Todo {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  category: 'work' | 'personal' | 'shopping' | 'other';
  priority: 'low' | 'medium' | 'high';
}

export interface TodoFormData {
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  category: Todo['category'];
  priority: Todo['priority'];
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
}