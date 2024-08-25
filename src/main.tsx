import { createRoot } from "react-dom/client";
import "./styles/index.css"
import { RouterProvider } from "react-router-dom";
import { routes } from "./route";

createRoot(document.getElementById("root")!).render(

    <RouterProvider router={routes}></RouterProvider>
 
);
