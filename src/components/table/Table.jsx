import React, { useState } from "react";
import {
  useGetCustomerByIdQuery,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from "../../context/api/customerApi";
import "./table.scss";
import { CUSTOM } from "../../static";
import { Link, useNavigate } from "react-router-dom";
import Module from "../Module/Module";
import PaymeForm from "../paymeForm/PaymeForm";
import { ImPushpin } from "react-icons/im";
import { GrPin } from "react-icons/gr";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Table = () => {
  const [tableClose, setTableClose] = useState(false);
  const [pinCustom, {}] = useUpdateCustomerMutation();
  const [budget, setBudget] = useState(2);
  const [budgetDebt, setBudgetDebt] = useState(2);
  const [filter, setFilter] = useState(0);
  const [createdAt, setCreatedAt] = useState(-1);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data, isLoading, isSuccess } = useGetCustomersQuery({
    page: page - 1,
    budget,
    budgetDebt,
    filter,
    createdAt,
  });
  let pageLength = Math.ceil(data?.totalCount / 10);

  const handlePinClick = (el) => {
    const pinData = {
      ...el,
      pin: !el.pin,
    };
    pinCustom({ id: el._id, body: pinData });
  };

  const customerTbody = CUSTOM.map((el, index) => (
    <tr key={el?._id}>
      <td data-cell="id">00{index + 1}</td>
      <td data-cell="name">{el?.fname}</td>
      <td data-cell="budget">{el?.lname}</td>
      <td data-cell="manzil">{el?.address}</td>
      <td data-cell="nomer">
        {el?.phone_primary ? el?.phone_primary : "+998123531282"}
      </td>

      <td data-cell="info" className="table__btns">
        <Link to={`/admin/customer/${el?._id}`}>
          <button className="table__btns-view">batafsil</button>
        </Link>
      </td>
    </tr>
  ));

  const handleSelect = (e) => {
    setPage(1);
    setBudget(e.target.value);
  };
  const handleSelectDebt = (e) => {
    setPage(1);
    setBudgetDebt(e.target.value);
  };

  const handleBudget = (e) => {
    setFilter(e.target.value);
  };

  const handleCreatedAt = (e) => {
    setCreatedAt(e.target.value);
  };

  return (
    <div className="table">
      <div className="table__select">
        <button>Jami: {data?.totalCount}</button>
        <select onChange={handleSelect} name="" id="">
          <option value="2">Barchasi</option>
          <option value="1">To'lov qilgan</option>
          <option value="-1">To'lov qilmagan</option>
        </select>

        <select onChange={handleSelectDebt} name="" id="">
          <option value="2">Barchasi</option>
          <option value="-1">Qarzdorlar</option>
          <option value="1">Haqdorlar</option>
          <option value="0">Nollar</option>
        </select>

        <select onChange={handleBudget} name="" id="">
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
            <th style={{ paddingLeft: "100px" }}>/</th>
          </tr>
        </thead>
        <tbody>{customerTbody}</tbody>
        {tableClose ? (
          <Module bg={"#aaa8"} width={400} close={setTableClose}>
            <PaymeForm close={setTableClose} id={tableClose?._id} />
          </Module>
        ) : (
          <></>
        )}
      </table>
      <div className="table__pagenation">
        <Stack spacing={2}>
          <Pagination count={pageLength} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
};

export default Table;
