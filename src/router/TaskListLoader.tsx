import axios from "axios";

export const TaskListLoader = async () => {
  const res = await axios.get("http://localhost:3003/tasklist");
  if (res.status !== 200) throw new Error("Kazkokia json-server klaida...");
  return res.data;
};

export const TaskListHydrateCallback = () => {
  return <div>tipo puslapis kraunasi (cia kazka reiketu padaryti grazaus)</div>;
};
