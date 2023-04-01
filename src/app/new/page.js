"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
//** Hooks
import { useTasks } from "../../context/TaskContext";

function Page({ params }) {
  //** Hook
  const router = useRouter();
  const { tasks, createTask, updateTask } = useTasks();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //** Functions

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    if (params.id) {
      updateTask(params.id, data);
      toast.success("Task updated successfully");
    } else {
      createTask(data.title, data.description);
      toast.success("Task created successfully");
    }
    router.push("/");
  });

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound) {
        setValue("title", taskFound.title);
        setValue("description", taskFound.description);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={onSubmit} className="bg-gray-700 p-10">
        <h2 className="mb-5 font-bold text-3xl">
          {params.id ? "Edit Task" : "New Task"}
        </h2>

        <input
          className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full"
          placeholder="Write a title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="block text-red-400 mb-2">This field required</span>
        )}
        <textarea
          className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full"
          placeholder="Write a description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="block text-red-400 mb-2">This field required</span>
        )}
        <button className="bg-green-500 hover:bg-green-400 px-4 py-2 text-gray-50 font-bold rounded-sm inline-flex items-center disabled:opacity-30">
          Save
        </button>
      </form>
    </div>
  );
}

export default Page;
