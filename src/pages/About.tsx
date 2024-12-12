import React from 'react';
import { Github } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-emerald-800">Sobre</h1>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-emerald-700">
          Todo List App
        </h2>
        
        <p className="text-gray-600">
          Este é um aplicativo de gerenciamento de tarefas desenvolvido com React,
          TypeScript e Tailwind CSS. O aplicativo permite que você organize suas
          tarefas diárias, defina prazos e acompanhe seu progresso.
        </p>

        <div className="space-y-2">
          <h3 className="font-semibold text-emerald-700">Recursos:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Gerenciamento completo de tarefas</li>
            <li>Visualização em calendário</li>
            <li>Categorização de tarefas</li>
            <li>Interface responsiva</li>
            <li>Tema verde elegante</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <a
            href="https://github.com/lucasmarujo/todolist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          >
            <Github className="w-5 h-5" />
            <span>Ver no GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};