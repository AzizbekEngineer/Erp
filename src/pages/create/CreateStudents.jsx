import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./createStudents.scss";
import { useGetGroupsCourseIdQuery } from "../../context/api/groupApi";
import { useGetCoursesQuery } from "../../context/api/courseApi";
<<<<<<< HEAD
import { useCreateStudentMutation } from "../../context/api/studentApi";
import { useGetValue } from "../../hooks/useGetValue";

const initialState = {
  firstName: "Sardor",
  lastName: "Toirov",
  phone: "+998994374718",
  address: "qashqadaryo",
=======
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "../../context/api/studentApi";
import { useGetValue } from "../../hooks/useGetValue";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
>>>>>>> origin/ramziddin
  courseId: "",
  groupId: "",
};

const CreateStudents = () => {
<<<<<<< HEAD
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
=======
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
    // Ensure the phone number is in E.164 format
    const sanitizedPhone = `+${phone.replace(/[^0-9]/g, "").trim()}`;
    setFormData({ ...formData, phone: sanitizedPhone });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the phone number for debugging purposes
    console.log("Formatted Phone:", formData.phone);

    // Validate phone
    if (!/^\+\d{11,15}$/.test(formData.phone)) {
      alert("Telefon raqam noto‘g‘ri formatda. Iltimos, qayta tekshiring.");
      return;
    }

    createStudent(formData)
      .unwrap()
      .then(() => {
        alert("O'quvchi muvaffaqiyatli yaratildi!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "O'quvchini yaratishda xatolik yuz berdi:\n" +
            (error?.data?.message || "Noma'lum xatolik")
        );
      });
>>>>>>> origin/ramziddin
  };

  return (
    <div className="createStudents container">
      <h2 className="createStudents__title">O'quvchi yaratish</h2>
      <form onSubmit={handleSubmit}>
<<<<<<< HEAD
        <label htmlFor="fname">
          Ism
          <input
            type="text"
            id="fname"
=======
        <label htmlFor="firstName">
          Ism
          <input
            type="text"
            id="firstName"
>>>>>>> origin/ramziddin
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
<<<<<<< HEAD
            id="lname"
=======
            id="lastName"
>>>>>>> origin/ramziddin
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
<<<<<<< HEAD
              value={formData.phone.replace("+", "")}
=======
              value={formData.phone.replace(/^\+/, "")} // Remove "+" for PhoneInput display
>>>>>>> origin/ramziddin
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
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/ramziddin
        </label>
        <button type="submit">Yaratish</button>
      </form>
    </div>
  );
};
export default CreateStudents;
