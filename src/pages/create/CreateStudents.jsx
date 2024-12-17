import React from "react";
import "./createStudents.scss";

const CreateStudents = () => {
  return (
    <div className="createStudents container">
      <h2 className="createStudents__title">O'quvchi yaratish</h2>
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
            type="tel"
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
        <label htmlFor="course">
          Kurs
          <input
            type="text"
            id="course"
            name="course"
            placeholder="Qaysi kursga yozilmoqdasiz?"
            required
          />
        </label>
        <button type="submit">Yaratish</button>
      </form>
    </div>
  );
};

export default CreateStudents;
