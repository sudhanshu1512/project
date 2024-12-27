import React from 'react';
import { useTodos } from '../contexts/TodoContext';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';
import { filterTodos } from '../utils/todoFilters';

interface TodoListProps {
  filter: string;
}

export default function TodoList({ filter }: TodoListProps) {
  const { todos, toggleTodo, deleteTodo, toggleImportant } = useTodos();
  const filteredTodos = filterTodos(todos, filter);

  if (filteredTodos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onToggleImportant={toggleImportant}
        />
      ))}
    </div>
  );
}