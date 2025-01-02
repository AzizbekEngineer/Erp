import React from "react";
import { useGetGroupsCourseIdQuery } from "../../../context/api/groupApi";
import { useParams } from "react-router-dom";
import Ranking from "../../../components/rangking/Ranking";

const SingleGroup = () => {
  const { id } = useParams();
  const { data: groupId } = useGetGroupsCourseIdQuery(id);
  return (
    <div>
      <Ranking data={groupId} id={id} />
    </div>
  );
};

export default SingleGroup;
