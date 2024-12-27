import React from 'react';
import { ClipboardList } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="p-8 text-center text-gray-500">
      <ClipboardList className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-lg font-medium">No tasks found</p>
      <p className="text-sm">Add some tasks to get started</p>
    </div>
  );
}