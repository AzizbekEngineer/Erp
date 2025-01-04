// import React, { useState } from "react";
// import "./table.scss";
// import { Link } from "react-router-dom";
// import Module from "../Module/Module";
// import PaymeForm from "../paymeForm/PaymeForm";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import {
//   useDeleteStudentMutation,
//   useUpdateStudentMutation,
// } from "../../context/api/studentApi";
// import { CiMenuKebab } from "react-icons/ci";

// const Table = ({ data, loc }) => {
//   const [tableClose, setTableClose] = useState(false);
//   const [budget, setBudget] = useState(2);
//   const [budgetDebt, setBudgetDebt] = useState(2);
//   const [filter, setFilter] = useState(0);
//   const [page, setPage] = useState(1);
//   const [deleteStudent] = useDeleteStudentMutation();
//   const [updateStudent] = useUpdateStudentMutation();
//   const [studentEdit, setStudentEdit] = useState(null);
//   const [activeStudentId, setActiveStudentId] = useState(null); // Track active menu

//   const handleDelete = (id) => {
//     if (window.confirm("O'quvchi o'chirilsinmi?")) {
//       deleteStudent(id);
//     }
//   };

//   const handleEdit = (student) => {
//     setStudentEdit(student);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     const updatedStudent = {
//       firstName: studentEdit.firstName,
//       lastName: studentEdit.lastName,
//       address: studentEdit.address,
//     };
//     console.log(updatedStudent);

//     updateStudent({ body: updatedStudent, id: studentEdit.id });
//     setStudentEdit(null);
//     setActiveStudentId(null);
//   };

//   const toggleMenu = (id) => {
//     setActiveStudentId(activeStudentId === id ? null : id);
//   };

//   const customerTbody = data?.map((el, index) => (
//     <tr key={el?.id}>
//       <td data-cell="id">{index + 1}</td>
//       <td data-cell="name">{el?.firstName}</td>
//       <td data-cell="budget">{el?.lastName}</td>
//       <td data-cell="manzil">{el?.address}</td>
//       <td data-cell="nomer">{el?.phone ? el?.phone : "+998123531282"}</td>
//       <td data-cell="group">{loc ? "Student" : el?.groups[0]?.course?.name}</td>
//       <td onClick={() => toggleMenu(el?.id)} data-cell="info">
//         <CiMenuKebab />
//       </td>

//       {activeStudentId === el?.id && (
//         <div className="table__hide">
//           <button
//             onClick={() => handleDelete(el?.id)}
//             className="table__btns-view"
//           >
//             delete
//           </button>
//           <button onClick={() => handleEdit(el)} className="table__btns-view">
//             edit
//           </button>
//           <Link to={`/admin/customer/${el?.id}`}>
//             <button className="table__btns-view">batafsil</button>
//           </Link>
//         </div>
//       )}
//     </tr>
//   ));

//   return (
//     <div className="table">
//       <div className="table__select">
//         <button>Jami:</button>
//         <select onChange={(e) => setBudget(e.target.value)}>
//           <option value="2">Barchasi</option>
//           <option value="1">To'lov qilgan</option>
//           <option value="-1">To'lov qilmagan</option>
//         </select>

//         <select onChange={(e) => setBudgetDebt(e.target.value)}>
//           <option value="2">Barchasi</option>
//           <option value="-1">Qarzdorlar</option>
//           <option value="1">Haqdorlar</option>
//           <option value="0">Nollar</option>
//         </select>

//         <select onChange={(e) => setFilter(e.target.value)}>
//           <option value="0">Guruhlar</option>
//           <option value="1">N5</option>
//           <option value="-1">N7</option>
//         </select>
//       </div>

//       <table className="table__row">
//         <thead>
//           <tr style={{ textAlign: "center" }}>
//             <td>№</td>
//             <th>Ism</th>
//             <th>Familiya</th>
//             <th>Manzil</th>
//             <th>Telefon nomer</th>
//             <th>{loc ? "Active" : "Kurs"}</th>
//             <th>/</th>
//           </tr>
//         </thead>
//         <tbody>{customerTbody}</tbody>
//         {tableClose && (
//           <Module bg={"#aaa8"} width={400} close={setTableClose}>
//             <PaymeForm close={setTableClose} id={tableClose?._id} />
//           </Module>
//         )}
//       </table>
//       <div className="table__pagenation">
//         <Stack spacing={2}>
//           <Pagination />
//         </Stack>
//       </div>

//       {studentEdit && (
//         <Module close={setStudentEdit} bg={"#aaa6"}>
//           <form className="teachers__edit" onSubmit={handleEditSubmit}>
//             <h3 className="teachers__edit-title">O'quvchinis taxrirlash</h3>
//             <label>
//               Ism
//               <input
//                 type="text"
//                 value={studentEdit.firstName}
//                 onChange={(e) =>
//                   setStudentEdit((prev) => ({
//                     ...prev,
//                     firstName: e.target.value,
//                   }))
//                 }
//                 required
//               />
//             </label>
//             <label>
//               Familiya
//               <input
//                 type="text"
//                 value={studentEdit.lastName}
//                 onChange={(e) =>
//                   setStudentEdit((prev) => ({
//                     ...prev,
//                     lastName: e.target.value,
//                   }))
//                 }
//                 required
//               />
//             </label>
//             <label>
//               Telefon raqam
//               <PhoneInput
//                 country={"uz"}
//                 value={studentEdit.phone}
//                 onChange={(phone) =>
//                   setStudentEdit((prev) => ({
//                     ...prev,
//                     phone,
//                   }))
//                 }
//                 inputStyle={{
//                   width: "100%",
//                   padding: "20px 45px",
//                   fontSize: "14px",
//                   border: "1px solid #dcdfe3",
//                   borderRadius: "8px",
//                 }}
//                 buttonStyle={{ background: "#f9fafe" }}
//               />
//             </label>
//             <label>
//               Manzil
//               <input
//                 type="text"
//                 value={studentEdit.address}
//                 onChange={(e) =>
//                   setStudentEdit((prev) => ({
//                     ...prev,
//                     address: e.target.value,
//                   }))
//                 }
//                 required
//               />
//             </label>

//             <button className="teachers__edit-btn" type="submit">
//               O'zgartirish
//             </button>
//           </form>
//         </Module>
//       )}
//     </div>
//   );
// };

// export default Table;import React, { useState, useEffect, useRef } from "react";
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
  useUpdateStudentMutation,
} from "../../context/api/studentApi";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Added icons
import { useEffect, useRef, useState } from "react";

const Table = ({ data, loc }) => {
  const [tableClose, setTableClose] = useState(false);
  const [budget, setBudget] = useState(2);
  const [budgetDebt, setBudgetDebt] = useState(2);
  const [filter, setFilter] = useState(0);
  const [page, setPage] = useState(1);
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [studentEdit, setStudentEdit] = useState(null);
  const [activeStudentId, setActiveStudentId] = useState(null); // Track active menu
  const tableRef = useRef();

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
      firstName: studentEdit.firstName,
      lastName: studentEdit.lastName,
      address: studentEdit.address,
      phone: studentEdit.phone, // Add phone to the updated student object
    };

    updateStudent({ body: updatedStudent, id: studentEdit.id });
    setStudentEdit(null);
    setActiveStudentId(null);
  };

  const toggleMenu = (id) => {
    setActiveStudentId(activeStudentId === id ? null : id);
  };

  const handleClickOutside = (e) => {
    if (tableRef.current && !tableRef.current.contains(e.target)) {
      setActiveStudentId(null); // Close menu if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const customerTbody = data
    ?.slice((page - 1) * 10, page * 10)
    .map((el, index) => (
      <tr key={el?.id}>
        <td data-cell="id">{index + 1}</td>
        <td data-cell="name">{el?.firstName}</td>
        <td data-cell="budget">{el?.lastName}</td>
        <td data-cell="manzil">{el?.address}</td>
        <td data-cell="nomer">{el?.phone || "+998123531282"}</td>
        <td data-cell="group">
          {loc ? "Student" : el?.groups[0]?.course?.name}
        </td>
        <td onClick={() => toggleMenu(el?.id)} data-cell="info">
          <CiMenuKebab />
        </td>

        {activeStudentId === el?.id && (
          <div className="table__hide">
            <button
              onClick={() => handleDelete(el?.id)}
              className="table__btns-view"
            >
              <FaTrashAlt /> Delete
            </button>
            <button onClick={() => handleEdit(el)} className="table__btns-view">
              <FaEdit /> Edit
            </button>
            <Link to={`/admin/customer/${el?.id}`}>
              <button className="table__btns-view">batafsil</button>
            </Link>
          </div>
        )}
      </tr>
    ));

  return (
    <div className="table" ref={tableRef}>
      <div className="table__select">
        <button>Jami:</button>
        <select onChange={(e) => setBudget(e.target.value)} value={budget}>
          <option value="2">Barchasi</option>
          <option value="1">To'lov qilgan</option>
          <option value="-1">To'lov qilmagan</option>
        </select>

        <select
          onChange={(e) => setBudgetDebt(e.target.value)}
          value={budgetDebt}
        >
          <option value="2">Barchasi</option>
          <option value="-1">Qarzdorlar</option>
          <option value="1">Haqdorlar</option>
          <option value="0">Nollar</option>
        </select>

        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="0">Guruhlar</option>
          <option value="1">N5</option>
          <option value="-1">N7</option>
        </select>
      </div>

      <table className="table__row">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <td>№</td>
            <th>Ism</th>
            <th>Familiya</th>
            <th>Manzil</th>
            <th>Telefon nomer</th>
            <th>{loc ? "Active" : "Kurs"}</th>
            <th>/</th>
          </tr>
        </thead>
        <tbody>{customerTbody}</tbody>
      </table>

      {tableClose && (
        <Module bg={"#aaa8"} width={400} close={setTableClose}>
          <PaymeForm close={setTableClose} id={tableClose?._id} />
        </Module>
      )}

      <div className="table__pagenation">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(data?.length / 10)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
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
                  setStudentEdit((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
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
                  setStudentEdit((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              Telefon raqam
              <PhoneInput
                country={"uz"}
                value={studentEdit.phone}
                onChange={(phone) =>
                  setStudentEdit((prev) => ({
                    ...prev,
                    phone,
                  }))
                }
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
                  setStudentEdit((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
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
