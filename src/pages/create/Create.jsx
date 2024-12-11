import React, { useState } from "react";
import { useCreateCustomerMutation } from "../../context/api/customerApi";
import "./create.scss";

let initialState = {
  fname: "",
  lname: "",
  phone_primary: "",
  address: "",
  budget: "",
};

const Create = () => {
  const [value, setValue] = useState(initialState);
  const [createCustom, { data, isLoading }] = useCreateCustomerMutation();

  const handleChange = (e) => {
    let { value, name } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCustom(value);
    setValue(initialState);
  };

  return (
    <div className="form container">
      <h2>Mijoz yaratish</h2>
      <form className="form__page" onSubmit={handleSubmit} action="">
        <div className="form__page__customer">
          <label htmlFor="">
            Ism
            <input
              required
              value={value.fname}
              name={"fname"}
              onChange={handleChange}
              placeholder="Ism"
              type="text"
            />
          </label>
          <label htmlFor="">
            Familiya
            <input
              required
              value={value.lname}
              name={"lname"}
              onChange={handleChange}
              placeholder="Familiya"
              type="text"
            />
          </label>
          <label htmlFor="">
            Telefon raqam
            <input
              required
              value={value.phone_primary}
              name={"phone_primary"}
              onChange={handleChange}
              placeholder="Telefon raqam"
              type="text"
            />
          </label>
          <label htmlFor="">
            Manzil
            <input
              required
              value={value.address}
              name={"address"}
              onChange={handleChange}
              placeholder="Manzil"
              type="text"
            />
          </label>
          <label htmlFor="">
            Pul
            <input
              required
              value={value.budget}
              name={"budget"}
              onChange={handleChange}
              placeholder="Summa kiriting"
              type="number"
            />
          </label>
        </div>
        <button>Yaratish</button>
      </form>
    </div>
  );
};

export default Create;
