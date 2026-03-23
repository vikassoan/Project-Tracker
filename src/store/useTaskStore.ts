import { create } from "zustand";
import type { Task } from "../utils/dataGenerator";

type ActiveUser = {
  id: string;
  name: string;
  color: string;
  taskId: string | null;
};

type Filters = {
  status: string[];
  priority: string[];
  assignee: string[];
  fromDate?: string;
  toDate?: string;
};

type TaskState = {
  tasks: Task[];
  filters: Filters;
  users: ActiveUser[];

  loading: boolean;              // ✅ ADD
  setLoading: (val: boolean) => void;  // ✅ ADD

  setTasks: (tasks: Task[]) => void;
  setFilters: (filters: Partial<Filters>) => void;

  updateTaskStatus: (id: string, status: Task["status"]) => void;
  moveUsers: () => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  filters: {
    status: [],
    priority: [],
    assignee: [],
  },

  users: [
    { id: "u1", name: "A", color: "#ef4444", taskId: null },
    { id: "u2", name: "B", color: "#3b82f6", taskId: null },
    { id: "u3", name: "C", color: "#22c55e", taskId: null },
  ],

  loading: true, // ✅ INITIAL TRUE

  setLoading: (val) => set({ loading: val }),

  setTasks: (tasks) => set({ tasks }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),

  moveUsers: () =>
    set((state) => ({
      users: state.users.map((user) => {
        const randomTask =
          state.tasks[Math.floor(Math.random() * state.tasks.length)];

        return {
          ...user,
          taskId: randomTask?.id || null,
        };
      }),
    })),
}));
