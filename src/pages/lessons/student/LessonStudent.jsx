import React from "react";
import { useGetLessonByIdQuery } from "../../../context/api/lessonApi";
import { useParams } from "react-router-dom";

const LessonStudent = () => {
  const { id } = useParams();
  const { data } = useGetLessonByIdQuery(id);
  console.log("data", data);

  return <div>Lesson Student</div>;
};

export default LessonStudent;
