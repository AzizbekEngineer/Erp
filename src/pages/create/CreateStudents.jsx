import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./createStudents.scss";
import { useGetGroupsCourseIdQuery } from "../../context/api/groupApi";
import { useGetCoursesQuery } from "../../context/api/courseApi";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "../../context/api/studentApi";
import { useGetValue } from "../../hooks/useGetValue";
import toast from "react-hot-toast";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  courseId: "",
  groupId: "",
};

const CreateStudents = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [createStudent] = useCreateStudentMutation();
  const { formData, setFormData, handleChange } = useGetValue(initialState);

  const { data: courseData, isLoading: isCourseLoading } = useGetCoursesQuery();
  const { data: groupData, isLoading: isGroupLoading } =
    useGetGroupsCourseIdQuery(selectedCourse, {
      skip: !selectedCourse,
    });

  const handleCourseChange = (e) => {
    const courseId = parseInt(e.target.value, 10);
    setSelectedCourse(courseId);
    setFormData({ ...formData, courseId, groupId: "" });
  };

  const handleGroupChange = (e) => {
    const groupId = parseInt(e.target.value, 10);
    setFormData({ ...formData, groupId });
  };

  const handlePhoneChange = (phone) => {
    const sanitizedPhone = `+${phone.replace(/[^0-9]/g, "").trim()}`;
    setFormData({ ...formData, phone: sanitizedPhone });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\+\d{11,15}$/.test(formData.phone)) {
      toast.error(
        "Telefon raqam noto‘g‘ri formatda. Iltimos, qayta tekshiring."
      );
      return;
    }

    createStudent(formData)
      .unwrap()
      .then(() => {
        toast.success("O'quvchi muvaffaqiyatli yaratildi!");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(
          "O'quvchini yaratishda xatolik yuz berdi:\n" +
            (error?.data?.message || "Noma'lum xatolik")
        );
      });
  };

  return (
    <div className="createStudents container">
      <h2 className="createStudents__title">O'quvchi yaratish</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          Ism
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Ismingizni kiriting"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="lastName">
          Familiya
          <input
            type="text"
            id="lastName"
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
              value={formData.phone.replace(/^\+/, "")} // Remove "+" for PhoneInput display
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
          {isCourseLoading ? (
            <p>Kurslar yuklanmoqda...</p>
          ) : (
            <select
              name="courseId"
              id="course"
              value={formData.courseId}
              onChange={handleCourseChange}
              required
            >
              <option value="">Kursni tanlang</option>
              {courseData?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          )}
        </label>
        <label htmlFor="group">
          Gruh
          {isGroupLoading ? (
            <p>Gruhlar yuklanmoqda...</p>
          ) : (
            <select
              name="groupId"
              id="group"
              value={formData.groupId}
              onChange={handleGroupChange}
              required
              disabled={!formData.courseId}
            >
              <option value="">Gruhni tanlang</option>
              {groupData?.length > 0 ? (
                groupData.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))
              ) : (
                <option disabled>Gruhlar topilmadi</option>
              )}
            </select>
          )}
        </label>
        <button type="submit">Yaratish</button>
      </form>
    </div>
  );
};

export default CreateStudents;
