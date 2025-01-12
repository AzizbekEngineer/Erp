import React from "react";
import { useGetLessonByIdQuery } from "../../../context/api/lessonApi";
import { useParams } from "react-router-dom";

const Lesson = () => {
  const { id } = useParams();
  const { data } = useGetLessonByIdQuery(id);
  console.log(data);

  return <div>Lesson</div>;
};

export default Lesson;
