import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { SELLER } from "../../../static";
import { useGetSellerQuery } from "../../../context/api/sellerApi";
import Module from "../../../components/Module/Module";
import CreateExpens from "../../../components/createExpens/CreateExpens";

const Seller = () => {
  const [expens, setExpens] = useState(false);
  const { data } = useGetSellerQuery();
  console.log(data?.innerData);

  const customerTbody = data?.innerData?.map((el, index) => (
    <tr key={el?._id}>
      <td>00{index + 1}</td>
      <td>{el?.fname}</td>
      <td>{el?.address}</td>
      <td>{el?.phone_primary ? el?.phone_primary : "+998123531282"}</td>
      <td>{el?.budget}</td>
      <td className="table__btns">
        <button onClick={() => setExpens(el)} className="table__btns-price">
          Tolov
        </button>
        <button className="table__btns-view">batafsil</button>
      </td>
    </tr>
  ));

  return (
    <div className="table">
      <table className="table__row">
        {expens ? (
          <Module bg={"#aaa6"} width={400} close={setExpens}>
            <CreateExpens close={setExpens} id={expens?._id} />
          </Module>
        ) : (
          <></>
        )}
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Budget</th>
            <th>info</th>
          </tr>
        </thead>
        <tbody>{customerTbody}</tbody>
      </table>
    </div>
  );
};

export default Seller;
