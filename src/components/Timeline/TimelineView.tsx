import { useTaskStore } from "../../store/useTaskStore";
import Skeleton from "../Common/Skeleton";
import { useMemo } from "react";

const DAY_WIDTH = 40;

const priorityColors: Record<string, string> = {
  Low: "#4ade80",
  Medium: "#facc15",
  High: "#fb923c",
  Critical: "#ef4444",
};

const TimelineView = () => {
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

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const todayIndex = today.getDate() - 1;

  const getPosition = (date: string) => {
    const d = new Date(date);
    return d.getDate() - 1;
  };

  if (tasks.length === 0) {
    return (
      <div className="p-4 space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length > 0 && filteredTasks.length === 0) {
    return (
      <div className="p-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b flex bg-gray-100 sticky top-0 z-10">
        <div className="w-48 p-2 font-semibold">Task</div>

        <div className="flex relative">
          {days.map((day) => (
            <div key={day} className="w-[40px] text-center text-xs border-l">
              {day}
            </div>
          ))}

          {/* Today Line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-red-500"
            style={{ left: todayIndex * DAY_WIDTH }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          {filteredTasks.map((task) => {
            const start = task.startDate
              ? getPosition(task.startDate)
              : getPosition(task.dueDate);

            const end = getPosition(task.dueDate);

            const width = (end - start + 1) * DAY_WIDTH;
            const left = start * DAY_WIDTH;

            return (
              <div key={task.id} className="flex border-b h-[50px]">
                {/* Task Name */}
                <div className="w-48 p-2 text-sm truncate">{task.title}</div>

                {/* Timeline Area */}
                <div className="relative flex flex-1">
                  {/* Bar */}
                  <div
                    className="absolute h-6 rounded"
                    style={{
                      left,
                      width,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: priorityColors[task.priority],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
