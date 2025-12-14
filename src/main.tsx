import './index.css'
import { RouterProvider } from 'react-router';
import Router from './Router';
import ReactDOM from "react-dom/client";
import { Toaster } from 'sonner';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <>
    <Toaster position="top-right" richColors />
    <RouterProvider router={Router} />,
  </>
);

