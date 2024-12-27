import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Plus, Calendar, Star, Clock } from 'lucide-react';
import TodoList from '../components/TodoList';
import AddTodoModal from '../components/AddTodoModal';
import FilterButton from '../components/FilterButton';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex space-x-4">
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All Tasks
          </FilterButton>
          
          <FilterButton
            active={filter === 'today'}
            onClick={() => setFilter('today')}
            icon={Calendar}
          >
            Today
          </FilterButton>
          
          <FilterButton
            active={filter === 'important'}
            onClick={() => setFilter('important')}
            icon={Star}
          >
            Important
          </FilterButton>
          
          <FilterButton
            active={filter === 'upcoming'}
            onClick={() => setFilter('upcoming')}
            icon={Clock}
          >
            Upcoming
          </FilterButton>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <TodoList filter={filter} />
        </div>
      </main>

      <AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}