export function filterTodos(todos: any[], filter: string) {
  return todos.filter(todo => {
    switch (filter) {
      case 'today':
        return new Date(todo.dueDate).toDateString() === new Date().toDateString();
      case 'important':
        return todo.important;
      case 'upcoming':
        return new Date(todo.dueDate) > new Date();
      default:
        return true;
    }
  });
}