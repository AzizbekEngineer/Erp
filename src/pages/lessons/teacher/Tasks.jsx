import React from "react";
import { useParams } from "react-router-dom";
import { useGetAssignmentQuery } from "../../../context/api/assigment";

const Tasks = () => {
  const { id } = useParams();
  const { data } = useGetAssignmentQuery(id);
  console.log("task", data);

  return <div>Tasks</div>;
};

export default Tasks;
