import React from "react";
import { useGetLessonByIdQuery } from "../../../context/api/lessonApi";
import { Link, useParams } from "react-router-dom";
import "./lesson.scss";

const Lesson = () => {
  const { id } = useParams();
  const { data: lessonsData } = useGetLessonByIdQuery(id);
  console.log(lessonsData);

  return (
    <div className="lesson">
      <div className="lesson_top">
        <button>Dars qo'shish</button>
      </div>
      <div className="lessons-container">
        {lessonsData?.map(({ id, title, lessonDate, endDate }) => (
          <Link to={`/admin/task/${id}`} key={id} className="lesson-card">
            <h3>{title}</h3>
            <p>
              <strong>Lesson Date:</strong>{" "}
              {new Date(lessonDate).toLocaleString()}
            </p>
            <p>
              <strong>End Date:</strong> {new Date(endDate).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lesson;
