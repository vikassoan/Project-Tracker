import { useEffect } from "react";
import { generateTasks } from "./utils/dataGenerator";
import { useTaskStore } from "./store/useTaskStore";
import Dashboard from "./pages/Dashboard";
import DashboardSkeleton from "./components/Common/DashboardSkeleton";

function App() {
  const setTasks = useTaskStore((s) => s.setTasks);
  const loading = useTaskStore((s) => s.loading);
  const setLoading = useTaskStore((s) => s.setLoading);

  useEffect(() => {
    const load = () => {
      const data = generateTasks(500);
      setTasks(data);
      setLoading(false);
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(load);
    } else {
      setTimeout(load, 0);
    }
  }, []);


  if (loading) {
    return <DashboardSkeleton />;
  }

  return <Dashboard />;
}

export default App;
