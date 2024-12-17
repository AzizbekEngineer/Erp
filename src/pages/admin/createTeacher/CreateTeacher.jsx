import React from "react";
import "./createTeacher.scss";

const CreateTeacher = () => {
  return (
    <div className="createTeacher container">
      <h2 className="createTeacher__title">O'qituvchi yaratish</h2>
      <form action="#">
        <label htmlFor="fname">
          Ism
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Ismingizni kiriting"
            required
          />
        </label>
        <label htmlFor="lname">
          Familiya
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Familiyangizni kiriting"
            required
          />
        </label>
        <label htmlFor="phone">
          Telefon raqami
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Telefon raqamingizni kiriting"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
          <small>Format: +998 93 612 34 34</small>
        </label>
        <label htmlFor="address">
          Manzil
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Manzilingizni kiriting"
            required
          />
        </label>
        <button type="submit">Yaratish</button>
      </form>
    </div>
  );
};

export default CreateTeacher;
