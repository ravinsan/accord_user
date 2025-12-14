import './index.css'
import { RouterProvider } from 'react-router';
import Router from './Router';
import ReactDOM from "react-dom/client";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={Router} />,
);

