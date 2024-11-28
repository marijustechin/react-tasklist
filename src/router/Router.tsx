import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ContactsPage from "../pages/ContactsPage";
import { TaskListPage } from "../pages/TaskListPage";
import { TaskListHydrateCallback, TaskListLoader } from "./TaskListLoader";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route
        loader={TaskListLoader}
        HydrateFallback={TaskListHydrateCallback}
        path="uzduociu-sarasas"
        element={<TaskListPage />}
      />
      <Route path="kontaktai" element={<ContactsPage />} />
    </Route>
  )
);

export const routerLinks = [
  { title: "Pradžia", href: "/" },
  { title: "Užduočių sąrašas", href: "/uzduociu-sarasas" },
  { title: "Kontaktai", href: "/kontaktai" },
];
