import React, { useState } from "react";
import "./table.scss";
import { Link } from "react-router-dom";
import Module from "../Module/Module";
import PaymeForm from "../paymeForm/PaymeForm";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  useDeleteStudentMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "../../context/api/studentApi";

const Table = () => {
  const [tableClose, setTableClose] = useState(false);
  const [budget, setBudget] = useState(2);
  const [budgetDebt, setBudgetDebt] = useState(2);
  const [filter, setFilter] = useState(0);
  const [createdAt, setCreatedAt] = useState(-1);
  const [page, setPage] = useState(1);
  const { data: studentData } = useGetStudentQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [studentEdit, setStudentEdit] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("O'quvchi o'chirilsinmi?")) {
      deleteStudent(id);
    }
  };

  const handleEdit = (student) => {
    setStudentEdit(student);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedStudent = {
      ...studentEdit,
    };
    updateStudent(updatedStudent);
    setStudentEdit(null);
  };

  const customerTbody = studentData?.map((el, index) => (
    <tr key={el?.id}>
      <td data-cell="id">00{index + 1}</td>
      <td data-cell="name">{el?.firstName}</td>
      <td data-cell="budget">{el?.lastName}</td>
      <td data-cell="manzil">{el?.address}</td>
      <td data-cell="nomer">{el?.phone ? el?.phone : "+998123531282"}</td>

      <td data-cell="info" className="table__btns">
        <button
          onClick={() => handleDelete(el?.id)}
          className="table__btns-view"
        >
          delete
        </button>
        <button onClick={() => handleEdit(el)} className="table__btns-view">
          edit
        </button>
        <Link to={`/admin/customer/${el?.id}`}>
          <button className="table__btns-view">batafsil</button>
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className="table">
      <div className="table__select">
        <button>Jami:</button>
        <select onChange={(e) => setBudget(e.target.value)}>
          <option value="2">Barchasi</option>
          <option value="1">To'lov qilgan</option>
          <option value="-1">To'lov qilmagan</option>
        </select>

        <select onChange={(e) => setBudgetDebt(e.target.value)}>
          <option value="2">Barchasi</option>
          <option value="-1">Qarzdorlar</option>
          <option value="1">Haqdorlar</option>
          <option value="0">Nollar</option>
        </select>

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="0">Guruhlar</option>
          <option value="1">N5</option>
          <option value="-1">N7</option>
        </select>
      </div>

      <table className="table__row">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>id</th>
            <th>Ism</th>
            <th>Familiya</th>
            <th>Manzil</th>
            <th>Telefon nomer</th>
            <th>Toliq malumot</th>
          </tr>
        </thead>
        <tbody>{customerTbody}</tbody>
        {tableClose && (
          <Module bg={"#aaa8"} width={400} close={setTableClose}>
            <PaymeForm close={setTableClose} id={tableClose?._id} />
          </Module>
        )}
      </table>
      <div className="table__pagenation">
        <Stack spacing={2}>
          <Pagination />
        </Stack>
      </div>

      {studentEdit && (
        <Module close={setStudentEdit} bg={"#aaa6"}>
          <form className="teachers__edit" onSubmit={handleEditSubmit}>
            <h3 className="teachers__edit-title">O'quvchinis taxrirlash</h3>
            <label>
              Ism
              <input
                type="text"
                value={studentEdit.firstName}
                onChange={(e) =>
                  setStudentEdit({ ...studentEdit, firstName: e.target.value })
                }
                required
              />
            </label>
            <label>
              Familiya
              <input
                type="text"
                value={studentEdit.lastName}
                onChange={(e) =>
                  setStudentEdit({ ...studentEdit, lastName: e.target.value })
                }
                required
              />
            </label>
            <label>
              Telefon raqam
              <PhoneInput
                country={"uz"}
                value={studentEdit.phone}
                onChange={(phone) => setStudentEdit({ ...studentEdit, phone })}
                inputStyle={{
                  width: "100%",
                  padding: "20px 45px",
                  fontSize: "14px",
                  border: "1px solid #dcdfe3",
                  borderRadius: "8px",
                }}
                buttonStyle={{ background: "#f9fafe" }}
              />
            </label>
            <label>
              Manzil
              <input
                type="text"
                value={studentEdit.address}
                onChange={(e) =>
                  setStudentEdit({ ...studentEdit, address: e.target.value })
                }
                required
              />
            </label>

            <button className="teachers__edit-btn" type="submit">
              O'zgartirish
            </button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default Table;
