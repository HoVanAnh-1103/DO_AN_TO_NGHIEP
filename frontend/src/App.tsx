import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/index';
import ErrorPage from './pages/Error';
import Dashboard from './pages/Dashboard/Index/index';
import ClassManagement from './pages/Dashboard/PM/ClassManagement';
import SubjectManagement from './pages/Dashboard/PM/Subject'
import RoomManagement from './pages/Dashboard/PM/RoomManagement';
import { useDispatch } from 'react-redux';
import { setUser } from '@redux/userSlice';
import { authService } from '@services/auth.service';
import OwnerSChedule from './pages/Dashboard/Teacher/OwnerSchedule';
import SignUpSchedule from './pages/Dashboard/Teacher/SignUpSchedule';
import SignManagement from './pages/Dashboard/PM/SignManagement';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      { path: "class-management", element: <ClassManagement /> },
      { path: 'subject-management', element: <SubjectManagement /> },
      { path: 'room-management', element: <RoomManagement /> },
      { path: 'sign-management', element: <SignManagement /> },
      { path: 'lich-day-ca-nhan', element: <OwnerSChedule /> },
      { path: 'dang-ky-lich-day', element: <SignUpSchedule /> }
    ]
  },
  {
    path: "/login",
    element: <Login />,

  },

]);
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const func = async () => {
      const data = await authService.getMe()
      dispatch(setUser(data))
    }

    func()

  }, [])
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
