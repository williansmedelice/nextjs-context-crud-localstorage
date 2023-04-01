"use client";
//** Hook
import { useTasks } from "../context/TaskContext";
//** Components
import TaskCard from "../components/TaskCard";

function Page() {
  const { tasks } = useTasks();
  // console.log(tasks);
  return (
    <div className="flex justify-center">
      <div className="w-7/12">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Page;
