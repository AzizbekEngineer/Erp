import React from "react";
import { useGetLessonByIdQuery } from "../../../context/api/lessonApi";
import { Link, useParams } from "react-router-dom";
import { useGetAssignmentQuery } from "../../../context/api/assigment";

const LessonStudent = () => {
  const { id } = useParams();
  const { data } = useGetLessonByIdQuery(id);
  console.log("data", data);

  return (
    <div className="lesson">
      <div className="lessons-container">
        {data?.map(({ id, title, lessonDate, endDate }) => (
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

export default LessonStudent;
