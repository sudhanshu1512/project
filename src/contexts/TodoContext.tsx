import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  important: boolean;
  dueDate: string;
  userId: string;
}

interface NewTodo {
  title: string;
  description: string;
  dueDate: string;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: NewTodo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  toggleImportant: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load todos from localStorage when component mounts
    if (user) {
      const storedTodos = localStorage.getItem(`todos_${user.id}`);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }
  }, [user]);

  useEffect(() => {
    // Save todos to localStorage whenever they change
    if (user) {
      localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  const addTodo = (newTodo: NewTodo) => {
    if (!user) return;

    const todo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      ...newTodo,
      completed: false,
      important: false,
      userId: user.id,
    };

    setTodos((prev) => [...prev, todo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleImportant = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, important: !todo.important } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, toggleImportant }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}