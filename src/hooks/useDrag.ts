import { useState } from "react";
import type { Task } from "../utils/dataGenerator";

export const useDrag = () => {
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const startDrag = (task: Task, e: any) => {
    setDraggingTask(task);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMove = (e: PointerEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const endDrag = () => {
    setDraggingTask(null);
  };

  return {
    draggingTask,
    position,
    startDrag,
    onMove,
    endDrag,
  };
};