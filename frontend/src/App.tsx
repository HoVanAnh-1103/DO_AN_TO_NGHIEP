import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/index';
import ErrorPage from './pages/Error';
import Dashboard from './pages/Dashboard/Index/index';
import ClassManagement from './pages/Dashboard/PM/ClassManagement';
import SubjectManagement from './pages/Dashboard/PM/Subject'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      { path: "class-management", element: <ClassManagement /> },
      { path: 'subject-management', element: <SubjectManagement />}
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
