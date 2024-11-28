import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useTaskListContext } from "../service/TaskListContext";
import { v4 } from "uuid";

interface IModalProps {
  open: boolean;
  onClose: () => void;
}

interface IFormValue {
  taskText: string;
}

export const AddTaskModal = ({ open, onClose }: IModalProps) => {
  const taskStatus = useTaskListContext();
  const [priority, setPriority] = useState("Aukštas");
  const [inputText, setInputText] = useState("");

  const { register, handleSubmit } = useForm<IFormValue>();

  const onSubmit: SubmitHandler<IFormValue> = async (data) => {
    const newTask = {
      id: v4(),
      task: data.taskText,
      progress: 0,
      priority: priority,
      status: "Nepradėta",
    };

    const res = await axios.post("http://localhost:3003/tasklist", {
      task: data.taskText,
      progress: 0,
      priority: priority,
      status: "Nepradėta",
    });

    taskStatus.addTask(newTask);
    onClose();
    // cia rodysim error
    if (res.status !== 200) return null;
  };

  return (
    /** overlejus */
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-slate-800/50" : "invisible"
      }`}
      onClick={onClose}
    >
      {/* langas */}
      <div
        // reikia sustabdyti is tevo
        // paveldeta onclik funkcija
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-100 rounded-xl shadow p-6 transition-all text-lg w-[450px] ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold pb-3">Pridėti užduotį</h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-200 hover:text-slate-600"
          >
            <IoMdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="taskText">Užduotis</label>
            <input
              className="rounded-lg p-2"
              autoComplete="on"
              type="text"
              id="taskText"
              {...register("taskText", {
                onChange: (e) => {
                  setInputText(e.target.value);
                },
              })}
            />
          </div>
          <div>
            <p className="text-sm font-semibold mt-4">Prioritetas</p>
            <div className="flex justify-start gap-3">
              <button
                onClick={() => setPriority("Aukštas")}
                disabled={priority === "Aukštas"}
                className={`${
                  priority === "Aukštas"
                    ? "bg-rose-500 text-white"
                    : "border-rose-500 text-rose-500"
                } border px-3 py-1 rounded-md`}
              >
                Aukštas
              </button>
              <button
                onClick={() => setPriority("Vidutinis")}
                disabled={priority === "Vidutinis"}
                className={`${
                  priority === "Vidutinis"
                    ? "bg-amber-400 text-white"
                    : "border-amber-400 text-amber-400"
                } border px-3 py-1 rounded-md`}
              >
                Vidutinis
              </button>
              <button
                onClick={() => setPriority("Žemas")}
                disabled={priority === "Žemas"}
                className={`${
                  priority === "Žemas"
                    ? "bg-emerald-500 text-white"
                    : "border-emerald-500 text-emerald-500"
                } border px-3 py-1 rounded-md`}
              >
                Žemas
              </button>
            </div>
          </div>
          <div className="w-full flex justify-end pt-3">
            <button
              disabled={inputText.length < 2}
              className={`${
                inputText.length < 2 ? "btn-violet-disabled" : "btn-violet"
              }`}
              type="submit"
            >
              Pridėti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
