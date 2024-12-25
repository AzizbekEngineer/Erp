import React from "react";
import { useGetGroupsCourseIdQuery } from "../../../context/api/groupApi";
import { useParams } from "react-router-dom";

const SingleGroup = () => {
  const { id } = useParams();
  const { data: groupId } = useGetGroupsCourseIdQuery(id);
  console.log("groupId", groupId);
  return <div>SingleGroup</div>;
};

export default SingleGroup;
