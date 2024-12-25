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
import Homework from "./pages/admin/homework/Homework";
import CreateTeacher from "./pages/admin/createTeacher/CreateTeacher";
import Teachers from "./pages/admin/teachers/Teachers";
import Ranking from "./pages/teacher/rangking/Ranking";
import Course from "./pages/courses/Course";
import StudentRating from "./pages/admin/studentsRank/StudentsRank";
import Group from "./pages/group/Group";
import SingleGroup from "./pages/group/singleGroup/SingleGroup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin/" element={<Admin />}>
            <Route path="students" element={<Students />} />
            <Route path="StudentRating" element={<StudentRating />} />
            <Route path="homework" element={<Homework />} />
            <Route path="createStudents" element={<CreateStudents />} />
            <Route path="customer/:id" element={<SingleCustomer />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="group" element={<Group />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="profile" element={<Profile />} />
            <Route path="groups/:id" element={<SingleGroup />} />
            <Route path="createTeacher" element={<CreateTeacher />} />
            <Route path="course" element={<Course />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
