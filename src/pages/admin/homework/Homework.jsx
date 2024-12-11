import React from "react";
import Table from "../../../components/table/Table";
import { STORE } from "../../../static";

const Homework = () => {
  const customerTbody = STORE?.map((el, index) => (
    <tr key={el?._id}>
      <td>{index + 1}</td>
      <td>{el?.title}</td>
      <td>{el?.quantity}</td>
      <td>{(el?.price).toFixed(2)}</td>
      <td>{(el?.price * el?.quantity).toFixed(2)}</td>
      <td className="table__btns">
        <button className="table__btns-view">batafsil</button>
      </td>
    </tr>
  ));

  return (
    <div className="table">
      <table className="table__row">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>{customerTbody}</tbody>
      </table>
    </div>
  );
};

export default Homework;
