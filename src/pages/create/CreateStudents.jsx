import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./createStudents.scss";
import { useGetGroupsCourseIdQuery } from "../../context/api/groupApi";
import { useGetCoursesQuery } from "../../context/api/courseApi";
import { useCreateStudentMutation } from "../../context/api/studentApi";
import { useGetValue } from "../../hooks/useGetValue";

const initialState = {
  firstName: "Sardor",
  lastName: "Toirov",
  phone: "+998994374718",
  address: "qashqadaryo",
  courseId: "",
  groupId: "",
};

const CreateStudents = () => {
  const { formData, setFormData, handleChange } = useGetValue(initialState);

  const [selectedCourseId, setSelectedCourseId] = useState(""); // Kurs id saqlash uchun state
  const { data: courseData } = useGetCoursesQuery();
  const [createStudent] = useCreateStudentMutation();
  const { data: groupData } = useGetGroupsCourseIdQuery(selectedCourseId);

  const handleCourseChange = (e) => {
    const selectedId = parseInt(e.target.value, 10); // Convert to integer
    setSelectedCourseId(selectedId);
    setFormData((prev) => ({ ...prev, courseId: +selectedId }));
  };

  const handleGroupChange = (e) => {
    const groupId = parseInt(e.target.value, 10); // Convert to integer
    setFormData((prev) => ({ ...prev, groupId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\+\d{10,15}$/.test(formData.phone)) {
      alert(
        "Telefon raqam noto'g'ri formatda. Iltimos, to'g'ri raqam kiriting."
      );
      return;
    }

    createStudent(formData);
    console.log(formData);
    setFormData(initialState);
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone: `+${phone}` });
  };

  return (
    <div className="createStudents container">
      <h2 className="createStudents__title">O'quvchi yaratish</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">
          Ism
          <input
            type="text"
            id="fname"
            name="firstName"
            placeholder="Ismingizni kiriting"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="lname">
          Familiya
          <input
            type="text"
            id="lname"
            name="lastName"
            placeholder="Familiyangizni kiriting"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="phone">
          Telefon raqam
          <div>
            <PhoneInput
              country={"uz"}
              value={formData.phone.replace("+", "")}
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
            id="address"
            name="address"
            placeholder="Manzilingizni kiriting"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="course">
          Kurs
          <select
            name="courseId"
            id="course"
            value={formData.courseId}
            onChange={handleCourseChange}
            required
          >
            <option value="" disabled>
              Kursni tanlang
            </option>
            {courseData?.map((course) => (
              <option key={course?.id} value={course?.id}>
                {course?.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="group">
          Gruh
          <select
            name="groupId"
            id="group"
            value={formData.groupId}
            onChange={handleGroupChange}
            disabled={!selectedCourseId}
            required
          >
            <option value="" disabled>
              Gruhni tanlang
            </option>
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
