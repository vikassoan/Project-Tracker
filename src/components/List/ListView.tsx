import { useTaskStore } from "../../store/useTaskStore";
import { useState } from "react";
import { useMemo } from "react";
import Skeleton from "../Common/Skeleton";
import Row from "./Row";

type SortKey = "title" | "priority" | "dueDate";

const ListView = () => {
  const ROW_HEIGHT = 50;
  const BUFFER = 5;
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 500; // fixed height for now
  const tasks = useTaskStore((s) => s.tasks);
  const filters = useTaskStore((s) => s.filters);

  const filteredTasks = useMemo(() => {
    if (
      !filters.status.length &&
      !filters.priority.length &&
      !filters.assignee.length &&
      !filters.fromDate &&
      !filters.toDate
    ) {
      return tasks;
    }
    return tasks.filter((task) => {
      if (filters.status.length && !filters.status.includes(task.status))
        return false;

      if (filters.priority.length && !filters.priority.includes(task.priority))
        return false;

      if (filters.assignee.length && !filters.assignee.includes(task.assignee))
        return false;

      if (
        filters.fromDate &&
        new Date(task.dueDate) < new Date(filters.fromDate)
      )
        return false;

      if (filters.toDate && new Date(task.dueDate) > new Date(filters.toDate))
        return false;

      return true;
    });
  }, [tasks, filters]);

  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      let valA: any = a[sortKey];
      let valB: any = b[sortKey];

      if (sortKey === "priority") {
        const order = ["Critical", "High", "Medium", "Low"];
        valA = order.indexOf(a.priority);
        valB = order.indexOf(b.priority);
      }

      if (sortKey === "dueDate") {
        valA = new Date(a.dueDate).getTime();
        valB = new Date(b.dueDate).getTime();
      }

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredTasks, sortKey, direction]);

  const totalRows = sortedTasks.length;

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);

  const endIndex = Math.min(
    totalRows,
    Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT) + BUFFER,
  );

  const visibleTasks = sortedTasks.slice(startIndex, endIndex);

  const topSpacerHeight = startIndex * ROW_HEIGHT;
  const bottomSpacerHeight = (totalRows - endIndex) * ROW_HEIGHT;

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="p-4 space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-2 items-center">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Table Header */}
      <div className="grid grid-cols-5 p-3 border-b text-sm items-center bg-gray-200 sticky top-0 z-10 font-semibold">
        <div onClick={() => handleSort("title")} className="cursor-pointer">
          Title {sortKey === "title" && (direction === "asc" ? "↑" : "↓")}
        </div>
        <div>Assignee</div>
        <div onClick={() => handleSort("priority")} className="cursor-pointer">
          Priority {sortKey === "priority" && (direction === "asc" ? "↑" : "↓")}
        </div>
        <div>Status</div>
        <div onClick={() => handleSort("dueDate")} className="cursor-pointer">
          Due Date {sortKey === "dueDate" && (direction === "asc" ? "↑" : "↓")}
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto min-h-0" onScroll={onScroll}>
        {filteredTasks.length === 0 ? (
          tasks.length > 0 ? (
            // 🔥 FILTERED EMPTY → SHOW SKELETON
            <div className="p-4 space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-2 items-center">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>
          ) : null
        ) : (
          <>
            {/* Top Spacer */}
            <div style={{ height: topSpacerHeight }} />

            {/* Visible Rows */}
            {visibleTasks.map((task) => (
              <Row key={task.id} task={task} />
            ))}

            {/* Bottom Spacer */}
            <div style={{ height: bottomSpacerHeight }} />
          </>
        )}
      </div>
    </div>
  );
};

export default ListView;
