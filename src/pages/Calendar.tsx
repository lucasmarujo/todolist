import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useTodoStore } from '../store/todoStore';

export const Calendar: React.FC = () => {
  const { todos } = useTodoStore();
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-800">Calendário</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-emerald-600 text-white text-xl font-semibold">
          {format(today, 'MMMM yyyy')}
        </div>
        <div className="grid grid-cols-7 gap-px bg-emerald-200">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div
              key={day}
              className="p-2 text-center bg-emerald-100 font-semibold"
            >
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dayTodos = todos.filter(
              (todo) => format(todo.dueDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );

            return (
              <div
                key={day.toString()}
                className="min-h-[100px] p-2 bg-white border border-emerald-100"
              >
                <div className="font-semibold">{format(day, 'd')}</div>
                <div className="space-y-1">
                  {dayTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="text-sm p-1 bg-emerald-100 rounded truncate"
                    >
                      {todo.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};