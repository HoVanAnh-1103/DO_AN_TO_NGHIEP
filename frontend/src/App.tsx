import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/index';
import ErrorPage from './pages/Error';
import Dashboard from './pages/Dashboard/Index/index';
import ClassManagement from './pages/Dashboard/PM/ClassManagement';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    errorElement: <ErrorPage />,
    children:[
      { path: "class-management", element: <ClassManagement /> },
    ]
  },
  {
    path: "/login",
    element: <Login />,

  },

]);
function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
