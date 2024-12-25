import React from "react";
import Table from "../../../components/table/Table";
import { useGetStudentQuery } from "../../../context/api/studentApi";

const Students = () => {
  const { data } = useGetStudentQuery();
  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default Students;
