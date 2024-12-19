import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./createTeacher.scss";
import { useCreateCourseMutation } from "../../../context/api/courseApi";
import { useGetValue } from "../../../hooks/useGetValue";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  specialty: "",
};

const CreateTeacher = () => {
  const [createTeacher, { data }] = useCreateCourseMutation();
  const { formData, setFormData, handleChange } = useGetValue(initialState);

  const handleCreateTeacher = (e) => {
    e.preventDefault();
    createTeacher(formData);
    console.log(formData);
    setFormData(initialState);
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  return (
    <div className="createTeacher container">
      <h2 className="createTeacher__title">O'qituvchi yaratish</h2>
      <form onSubmit={handleCreateTeacher} action="#">
        <label htmlFor="fname">
          Ism
          <input
            type="text"
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
            placeholder="Ismingizni kiriting"
            required
          />
        </label>
        <label htmlFor="lname">
          Familiya
          <input
            type="text"
            value={formData.lastName}
            name="lastName"
            onChange={handleChange}
            placeholder="Familiyangizni kiriting"
            required
          />
        </label>
        <label htmlFor="phone">
          Telefon raqam
          <div>
            <PhoneInput
              country={"uz"}
              value={formData.phone}
              onChange={handlePhoneChange}
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
          </div>
        </label>
        <label htmlFor="address">
          Manzil
          <input
            type="text"
            value={formData.address}
            name="address"
            onChange={handleChange}
            placeholder="Manzilingizni kiriting"
            required
          />
        </label>
        <label htmlFor="specialty">
          Mutaxassislik
          <input
            type="text"
            value={formData.specialty}
            name="specialty"
            onChange={handleChange}
            placeholder="Mutaxassislikni kiriting"
            required
          />
        </label>
        <button type="submit">Yaratish</button>
      </form>
    </div>
  );
};

export default CreateTeacher;
