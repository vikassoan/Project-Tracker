import { useEffect, useMemo, useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import { useDrag } from "../../hooks/useDrag";
import TaskCard from "./TaskCard";
import Skeleton from "../Common/Skeleton";

const columns = [
  { key: "todo", title: "To Do" },
  { key: "inprogress", title: "In Progress" },
  { key: "review", title: "In Review" },
  { key: "done", title: "Done" },
];

const KanbanBoard = () => {
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const { draggingTask, position, startDrag, onMove, endDrag } = useDrag();
  const updateTaskStatus = useTaskStore((s) => s.updateTaskStatus);
  const tasks = useTaskStore((s) => s.tasks);
  const filters = useTaskStore((s) => s.filters);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
    if (filters.status.length && !filters.status.includes(task.status))
      return false;

    if (filters.priority.length && !filters.priority.includes(task.priority))
      return false;

    if (filters.assignee.length && !filters.assignee.includes(task.assignee))
      return false;

    if (filters.fromDate && new Date(task.dueDate) < new Date(filters.fromDate))
      return false;

    if (filters.toDate && new Date(task.dueDate) > new Date(filters.toDate))
      return false;

    return true;
  });
  }, [tasks, filters]);

  useEffect(() => {
    const handlePointerUp = () => {
      if (draggingTask) {
        endDrag();
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [onMove, draggingTask]);

  if (tasks.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-4 h-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-3 flex flex-col">
            {/* Header */}
            <Skeleton className="h-6 w-24 mb-3" />

            {/* Cards */}
            <div className="space-y-2">
              {[...Array(5)].map((_, j) => (
                <Skeleton key={j} className="h-20 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full select-none">
      <div className="grid grid-cols-4 gap-4 h-full overflow-hidden">
        {columns.map((col) => {
          const columnTasks = filteredTasks.filter((t) => t.status === col.key);

          return (
            <div
              key={col.key}
              onPointerEnter={() => setHoveredColumn(col.key)}
              onPointerLeave={() => setHoveredColumn(null)}
              onPointerUp={() => {
                if (draggingTask && hoveredColumn === col.key) {
                  updateTaskStatus(draggingTask.id, col.key as any);
                  endDrag();
                }
              }}
              className={`rounded-lg p-3 flex flex-col h-full min-h-0 transition ${
                hoveredColumn === col.key && draggingTask
                  ? "bg-blue-100 border-2 border-blue-400"
                  : "bg-gray-100 border border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-3 sticky top-0 bg-inherit z-10">
                <h2 className="font-semibold">{col.title}</h2>
                <span className="text-sm text-gray-500">
                  {columnTasks.length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {columnTasks.length === 0 ? (
                  tasks.length > 0 ? (
                    // 🔥 FILTERED EMPTY → SHOW SKELETON
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                      ))}
                    </div>
                  ) : null
                ) : (
                  columnTasks.map((task) => {
                    const isDragging = draggingTask?.id === task.id;

                    return isDragging ? (
                      <div
                        key={task.id}
                        className="h-20 bg-gray-200 rounded-lg border-2 border-dashed"
                      />
                    ) : (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onDragStart={startDrag}
                        isDragging={false}
                      />
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {draggingTask && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            top: position.y,
            left: position.x,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="bg-white p-3 rounded-lg shadow-lg border w-48 opacity-90">
            {draggingTask.title}
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
