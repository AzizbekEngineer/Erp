import React from "react";
import Table from "../../../components/table/Table";
import { useGetStudentQuery } from "../../../context/api/studentApi";

const Students = () => {
  const { data } = useGetStudentQuery();
  console.log("student");

  return (
    <div>
      <Table data={data} len={data?.length} />
    </div>
  );
};

export default Students;
