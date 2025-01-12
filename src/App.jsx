import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Admin = lazy(() => import("./pages/admin/Admin"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const SingleCustomer = lazy(() =>
  import("./pages/single-customer/SingleCustomer")
);
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Students = lazy(() => import("./pages/admin/students/Students"));
const CreateStudents = lazy(() => import("./pages/create/CreateStudents"));
const Homework = lazy(() => import("./pages/admin/homework/Homework"));
const CreateTeacher = lazy(() =>
  import("./pages/admin/createTeacher/CreateTeacher")
);
const Teachers = lazy(() => import("./pages/admin/teachers/Teachers"));
const Course = lazy(() => import("./pages/courses/Course"));
const StudentRating = lazy(() =>
  import("./pages/admin/studentsRank/StudentsRank")
);
const Group = lazy(() => import("./pages/group/Group"));
const SingleGroup = lazy(() => import("./pages/group/singleGroup/SingleGroup"));
const Ranking = lazy(() => import("./components/rangking/Ranking"));
const Home = lazy(() => import("./pages/home/Home"));
import { Toaster } from "react-hot-toast";
import GroupTeacher from "./pages/group/GroupTeacher";
import GroupStudent from "./pages/group/GroupStudent";
import Lesson from "./pages/lessons/teacher/Lesson";
import LessonStudent from "./pages/lessons/student/LessonStudent";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin/" element={<Admin />}>
            <Route path="home" element={<Home />} />
            <Route path="students" element={<Students />} />
            <Route path="StudentRating" element={<StudentRating />} />
            <Route path="homework" element={<Homework />} />
            <Route path="createStudents" element={<CreateStudents />} />
            <Route path="customer/:id" element={<SingleCustomer />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="group" element={<Group />} />
            <Route path="groupTeacher" element={<GroupTeacher />} />
            <Route path="groupStudent" element={<GroupStudent />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="profile" element={<Profile />} />
            <Route path="groups/:id" element={<SingleGroup />} />
            <Route path="lessons/group/:id" element={<Lesson />} />
            <Route path="lessonstudent/:id" element={<LessonStudent />} />
            <Route path="createTeacher" element={<CreateTeacher />} />
            <Route path="course" element={<Course />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
