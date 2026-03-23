import { useTaskStore } from "../../store/useTaskStore";

const statuses = ["todo", "inprogress", "review", "done"];
const priorities = ["Low", "Medium", "High", "Critical"];
type FilterKey = "status" | "priority" | "assignee";

const FilterBar = () => {
  const users = useTaskStore((s) => s.users);
  const { filters, setFilters, tasks } = useTaskStore();

  const assignees = Array.from(new Set(tasks.map((t) => t.assignee)));

  const toggle = (key: FilterKey, value: string) => {
    const current = filters[key];

    if (current.includes(value)) {
      setFilters({ [key]: current.filter((v: string) => v !== value) });
    } else {
      setFilters({ [key]: [...current, value] });
    }
  };

  return (
    <div className="flex flex-wrap gap-3 p-3 bg-gray-100 rounded">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex -space-x-2">
          {users.map((u) => (
            <div
              key={u.id}
              className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center border"
              style={{ backgroundColor: u.color }}
            >
              {u.name}
            </div>
          ))}
        </div>

        <span className="text-sm text-gray-600">
          {users.length} people are viewing
        </span>
      </div>
      {/* Status */}
      <div>
        <p className="text-xs font-semibold">Status</p>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => toggle("status", s)}
            className={`px-2 py-1 text-xs rounded mr-1 ${
              filters.status.includes(s)
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Priority */}
      <div>
        <p className="text-xs font-semibold">Priority</p>
        {priorities.map((p) => (
          <button
            key={p}
            onClick={() => toggle("priority", p)}
            className={`px-2 py-1 text-xs rounded mr-1 ${
              filters.priority.includes(p)
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Assignee */}
      <div>
        <p className="text-xs font-semibold">Assignee</p>
        {assignees.map((a) => (
          <button
            key={a}
            onClick={() => toggle("assignee", a)}
            className={`px-2 py-1 text-xs rounded mr-1 ${
              filters.assignee.includes(a)
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Date Range */}
      <div>
        <p className="text-xs font-semibold">Date</p>
        <input
          type="date"
          onChange={(e) => setFilters({ fromDate: e.target.value })}
          className="border text-xs p-1 mr-1"
        />
        <input
          type="date"
          onChange={(e) => setFilters({ toDate: e.target.value })}
          className="border text-xs p-1"
        />
      </div>
    </div>
  );
};

export default FilterBar;
