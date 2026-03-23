import React from "react";
import type { Task } from "../../utils/dataGenerator";
import { useTaskStore } from "../../store/useTaskStore";

const Row = ({ task }: { task: Task }) => {
  const updateTaskStatus = useTaskStore((s) => s.updateTaskStatus);

  return (
    <div className="grid grid-cols-5 px-3 border-b text-sm items-center hover:bg-gray-50 h-[50px]">
      
      <div>{task.title}</div>

      <div>
        <span className="bg-gray-300 rounded-full px-2 py-1 text-xs">
          {task.assignee}
        </span>
      </div>

      <div>{task.priority}</div>

      {/* ✅ Inline Status Change */}
      <div>
        <select
          value={task.status}
          onChange={(e) =>
            updateTaskStatus(task.id, e.target.value as any)
          }
          className="border rounded px-2 py-1 text-xs"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="review">In Review</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>{new Date(task.dueDate).toLocaleDateString()}</div>
    </div>
  );
};

export default React.memo(Row);