import React from "react";
import type { Task } from "../../utils/dataGenerator";
import { useTaskStore } from "../../store/useTaskStore";

const priorityColors = {
  Low: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  High: "bg-orange-200 text-orange-800",
  Critical: "bg-red-200 text-red-800",
};

const getDueDateText = (date: string) => {
  const today = new Date();
  const due = new Date(date);

  const diffDays = Math.floor(
    (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Due Today";
  if (diffDays > 7) return `${diffDays} days overdue`;

  return due.toLocaleDateString();
};

const isOverdue = (date: string) => {
  return new Date(date) < new Date();
};

type Props = {
  task: Task;
  onDragStart: (task: Task, e: React.PointerEvent) => void;
  isDragging: boolean;
};

const TaskCard = ({ task, onDragStart, isDragging }: Props) => {
  const users = useTaskStore((s) => s.users);

  const activeUsers = users.filter((u) => u.taskId === task.id);
  return (
    <div
      style={{ transition: "transform 0.1s ease", willChange: "transform" }}
      onPointerDown={(e) => onDragStart(task, e)}
      className={`bg-white p-3 rounded-lg shadow-sm border space-y-2 cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      } hover:shadow-md select-none transition-all duration-300`}
    >
      {/* Title */}
      <div className="font-medium">{task.title}</div>

      <div className="flex -space-x-2">
        {activeUsers.slice(0, 2).map((u) => (
          <div
            key={u.id}
            className="w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center border"
            style={{ backgroundColor: u.color }}
          >
            {u.name}
          </div>
        ))}

        {activeUsers.length > 2 && (
          <div className="w-5 h-5 rounded-full bg-gray-300 text-[10px] flex items-center justify-center">
            +{activeUsers.length - 2}
          </div>
        )}
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center text-sm">
        {/* Assignee */}
        <div className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {task.assignee}
        </div>

        {/* Priority */}
        <span
          className={`px-2 py-1 rounded text-xs ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Due Date */}
      <div
        className={`text-xs ${
          isOverdue(task.dueDate) ? "text-red-500 font-medium" : "text-gray-500"
        }`}
      >
        {getDueDateText(task.dueDate)}
      </div>
    </div>
  );
};

export default React.memo(TaskCard);
