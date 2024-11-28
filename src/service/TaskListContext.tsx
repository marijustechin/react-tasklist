import { createContext, useContext } from "react";

export interface ITaskList {
  id: string;
  task: string;
  progress: number;
  priority: string;
  status: string;
}

export interface ITaskListContext {
  tasks: ITaskList[];
  addTask: (newTask: ITaskList) => void;
  removeTask: (taskId: string) => void;
}

export const TaskListContext = createContext<ITaskListContext | undefined>(
  undefined
);

export const useTaskListContext = () => {
  const taskStatus = useContext(TaskListContext);

  if (!taskStatus)
    throw new Error(
      "Komponentas turi būi naudojamas TaskListContext.Provider viduej"
    );

  return taskStatus;
};
