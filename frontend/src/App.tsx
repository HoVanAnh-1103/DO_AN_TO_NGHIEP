import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/index";
import ErrorPage from "./pages/Error";
import Dashboard from "./pages/Dashboard/Index/index";
import ClassManagement from "./pages/Dashboard/PM/ClassManagement";
import SubjectManagement from "./pages/Dashboard/PM/Subject";
import RoomManagement from "./pages/Dashboard/PM/RoomManagement";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/userSlice";
import { authService } from "@services/auth.service";
import OwnerSChedule from "./pages/Dashboard/Teacher/OwnerSchedule";
import SignUpSchedule from "./pages/Dashboard/Teacher/SignUpSchedule";
import SignManagement from "./pages/Dashboard/PM/SignManagement";
import Home from "./pages/User/Home";
import StudentManagement from "./pages/Dashboard/PM/StudentManagement";
import TeacherManagement from "./pages/Dashboard/PM/TeacherManagement";
import ApprovedStudent from "./pages/Dashboard/PM/ApprovedStudent";
import ScheduleSignUpClass from "./pages/Dashboard/Student/ScheduleSignUpClass";
import Schedule from "./pages/Dashboard/Student/Schedule";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      { path: "class-management", element: <ClassManagement /> },
      { path: "subject-management", element: <SubjectManagement /> },
      { path: "room-management", element: <RoomManagement /> },
      { path: "sign-management", element: <SignManagement /> },
      { path: "lich-day-ca-nhan", element: <OwnerSChedule /> },
      { path: "dang-ky-lich-day", element: <SignUpSchedule /> },
      { path: "quan-ly-giao-vien", element: <TeacherManagement /> },
      { path: "quan-ly-hoc-sinh", element: <StudentManagement /> },
      {path: 'duyet-dang-ky-hoc-sinh', element: <ApprovedStudent/>},
      {
        path: "hoc-sinh",
        children: [{ path: "dang-ky-lich-hoc", element: <ScheduleSignUpClass/> },{ path: "lich-hoc", element: <Schedule/> }],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      const data = await authService.getMe();
      dispatch(setUser(data));
    };

    func();
  }, []);
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
