import React from "react";
import { useParams } from "react-router-dom";
import { useGetAssignmentQuery } from "../../../context/api/assigment";
import "./task.scss";

const Tasks = () => {
  const { id } = useParams();
  const { data } = useGetAssignmentQuery(id);
  console.log("task", data);

  return (
    <div className="assignments-container">
      {data?.map(({ id, assignment, dueDate, updatedAt, submissions }) => (
        <div key={id} className="assignment-card">
          <h3>{assignment}</h3>
          <p>
            <strong>Due Date:</strong> {new Date(dueDate).toLocaleString()}
          </p>
          <p>
            <strong>Last Updated:</strong>
            {new Date(updatedAt).toLocaleString()}
          </p>
          <p>
            <strong>Submissions:</strong> {submissions.length}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
