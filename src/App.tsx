import { useEffect } from "react";
import { generateTasks } from "./utils/dataGenerator";
import { useTaskStore } from "./store/useTaskStore";
import Dashboard from "./pages/Dashboard";

function App() {
  const setTasks = useTaskStore((s) => s.setTasks);

  useEffect(() => {
    const data = generateTasks(500);
    setTasks(data);
  }, []);

  return <Dashboard />;
}

export default App;