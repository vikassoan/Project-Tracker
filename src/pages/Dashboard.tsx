import { lazy, Suspense, useState, useEffect } from "react";

const KanbanBoard = lazy(() => import("../components/Kanban/KanbanBoard"));
const ListView = lazy(() => import("../components/List/ListView"));
const TimelineView = lazy(() => import("../components/Timeline/TimelineView"));
import FilterBar from "../components/Filters/FilterBar";
import { useSearchParams } from "react-router-dom";
import { useTaskStore } from "../store/useTaskStore";

const Dashboard = () => {
  const [view, setView] = useState<"kanban" | "list" | "timeline">("kanban");
  const [params, setParams] = useSearchParams();
  const { filters, setFilters } = useTaskStore();
  const moveUsers = useTaskStore((s) => s.moveUsers);

  useEffect(() => {
    const query: any = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        query[key] = value.join(",");
      }
    });

    setParams(query);
  }, [filters]);

  useEffect(() => {
    const status = params.get("status")?.split(",") || [];
    const priority = params.get("priority")?.split(",") || [];

    setFilters({ status, priority });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveUsers();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-3">
        {["kanban", "list", "timeline"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v as any)}
            className={`px-4 py-2 rounded ${
              view === v ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <FilterBar />
      <div className="border rounded p-4 h-[80vh] overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          {view === "kanban" && <KanbanBoard />}
          {view === "list" && <ListView />}
          {view === "timeline" && <TimelineView />}
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
