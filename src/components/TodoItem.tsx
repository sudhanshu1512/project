import React from 'react';
import { Check, Star, Trash2, Calendar } from 'lucide-react';

interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  important: boolean;
  dueDate: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleImportant: (id: string) => void;
}

export default function TodoItem({
  id,
  title,
  description,
  completed,
  important,
  dueDate,
  onToggle,
  onDelete,
  onToggleImportant
}: TodoItemProps) {
  return (
    <div className="p-4 flex items-center justify-between border-b last:border-b-0">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {completed && <Check className="w-4 h-4 text-white" />}
        </button>
        
        <div className={completed ? 'line-through text-gray-500' : ''}>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(dueDate).toLocaleDateString()}
        </div>
        
        <button
          onClick={() => onToggleImportant(id)}
          className={`text-gray-400 hover:text-yellow-500 ${
            important ? 'text-yellow-500' : ''
          }`}
        >
          <Star className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}