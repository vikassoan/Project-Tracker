export type Task = {
  id: string;
  title: string;
  assignee: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "todo" | "inprogress" | "review" | "done";
  startDate?: string;
  dueDate: string;
};

const users = ["VK", "AR", "SJ", "KP", "RM", "TS"];
const priorities = ["Low", "Medium", "High", "Critical"] as const;
const statuses = ["todo", "inprogress", "review", "done"] as const;

export const generateTasks = (count: number): Task[] => {
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    const randomDays = Math.floor(Math.random() * 30);

    tasks.push({
      id: `task-${i}`,
      title: `Task ${i + 1}`,
      assignee: users[Math.floor(Math.random() * users.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      startDate: Math.random() > 0.3 ? new Date().toISOString() : undefined,
      dueDate: new Date(
        Date.now() + randomDays * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }

  return tasks;
};