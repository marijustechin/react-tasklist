import { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { AddTaskModal } from "../components/AddTaskModal";
import { ITaskList, TaskListContext } from "../service/TaskListContext";
import { DeleteTaskModal } from "../components/DeleteTaskModal";

export const TaskListPage = () => {
  const taskList = useLoaderData() as ITaskList[];

  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState("");

  const [taskState, setTaskState] = useState({
    tasks: taskList,
    addTask: (newTask: ITaskList) =>
      setTaskState({ ...taskState, tasks: [...taskList, newTask] }),
    removeTask: (taskId: string) =>
      setTaskState({
        ...taskState,
        tasks: [...taskState.tasks.filter((task) => task.id !== taskId)],
      }),
  });

  const handleDeleteTask = (id: string) => {
    setDeleteInfo(id);
    setDeleteTaskOpen(true);
  };

  return (
    <main className="max-w-3xl mx-auto mt-5 px-3 py-5 bg-slate-200 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Užduočių sąrašas</h1>
        <button onClick={() => setAddTaskOpen(true)} className="btn-violet">
          + Pridėti
        </button>
      </div>
      <div className="mt-8">
        {taskState.tasks
          .slice()
          .reverse()
          .map((task) => (
            <div
              className="bg-white my-2 p-2 rounded-md grid grid-cols-12 items-center"
              key={task.id}
            >
              <div className="col-span-5">
                <p className="text-sm text-slate-400">Užduotis</p>
                <p className="text-lg">{task.task}</p>
              </div>
              <div className="col-span-2 text-center">
                <p className="text-sm text-slate-400">Prioritetas</p>
                <p
                  className={`${
                    task.priority === "Aukštas"
                      ? "text-rose-500"
                      : task.priority === "Žemas"
                      ? "text-emerald-500"
                      : "text-amber-300"
                  } text-sm font-semibold`}
                >
                  {task.priority}
                </p>
              </div>
              <div className="col-span-2 text-center relative">
                <p className="text-sm text-slate-400">Būsena</p>
                <p className="inline text-sm text-slate-800 font-semibold rounded-md bg-slate-300 py-1 px-2 cursor-pointer">
                  {task.status}
                </p>
              </div>
              <div className="col-span-1 w-[50%] pl-1 flex justify-end">
                <CircularProgressbar
                  value={task.progress}
                  strokeWidth={7}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "blueviolet",
                    trailColor: "gainsboro",
                  })}
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <FaRegEdit size={22} />
              </div>
              <div
                onClick={() => handleDeleteTask(task.task)}
                className="col-span-1 flex justify-center cursor-pointer"
              >
                <FaRegTrashAlt className="text-rose-600" size={20} />
              </div>
            </div>
          ))}
      </div>
      <TaskListContext.Provider value={{ ...taskState }}>
        <DeleteTaskModal
          open={deleteTaskOpen}
          onClose={() => setDeleteTaskOpen(false)}
        >
          {deleteInfo}
        </DeleteTaskModal>
        <AddTaskModal
          open={addTaskOpen}
          onClose={() => setAddTaskOpen(false)}
        />
      </TaskListContext.Provider>
    </main>
  );
};
