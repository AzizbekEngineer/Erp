import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./createStudents.scss";
import { useGetGroupsQuery } from "../../context/api/groupApi";
import { useGetCoursesQuery } from "../../context/api/courseApi";

const CreateStudents = () => {
  const [phone, setPhone] = useState("");
  const { data: courseData } = useGetCoursesQuery();
  const { data: groupData } = useGetGroupsQuery();
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
          Telefon raqam
          <div>
            <PhoneInput
              country={"uz"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              placeholder="Telefon raqamini kiriting"
              inputStyle={{
                width: "100%",
                padding: "20px 45px",
                fontSize: "14px",
                border: "1px solid #dcdfe3",
                borderRadius: "8px",
              }}
              buttonStyle={{
                background: "#f9fafe",
              }}
            />
            {/* <p className="phone-display">Telefon raqam: {phone}</p> */}
          </div>
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
          <select name="" id="">
            {courseData?.map((courseData) => (
              <option key={courseData?.id} value={courseData?.id}>
                {courseData?.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="teacher">
          Gruh
          <select name="" id="">
            {groupData?.map((group) => (
              <option key={group?.id} value={group?.id}>
                {group?.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Yaratish</button>
      </form>
    </div>
  );
};

export default CreateStudents;
