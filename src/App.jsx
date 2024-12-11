import React from "react";
import Admin from "./pages/admin/Admin";
import { Routes, Route, Navigate } from "react-router-dom";
import SingleCustomer from "./pages/single-customer/SingleCustomer";
import Paymet from "./pages/paymet/Paymet";
import Auth from "./pages/auth/Auth";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Students from "./pages/admin/students/Students";
import CreateStudents from "./pages/create/CreateStudents";
import StudentsRank from "./pages/admin/studentsRank/StudentsRank";
import Homework from "./pages/admin/homework/Homework";
import CreateTeacher from "./pages/admin/createTeacher/CreateTeacher";
import Teachers from "./components/teachers/Teachers";

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Navigate to={"/login"} />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin/" element={<Admin />}>
            <Route path="students" element={<Students />} />
            <Route path="studentsRank" element={<StudentsRank />} />
            <Route path="homework" element={<Homework />} />
            <Route path="createStudents" element={<CreateStudents />} />
            <Route path="customer/:id" element={<SingleCustomer />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="profile" element={<Profile />} />
            <Route path="createTeacher" element={<CreateTeacher />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
