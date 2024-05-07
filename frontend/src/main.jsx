import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import TokenTest from './pages/TokenTest.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/app",
    element: <TokenTest />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
      <RouterProvider router={router} />
);