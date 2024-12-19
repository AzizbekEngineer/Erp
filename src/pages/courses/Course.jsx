import React, { useState } from "react";
import "./course.scss";
import Module from "../../components/Module/Module";
import {
  useCreateCourseMutation,
  useGetCoursesQuery,
} from "../../context/api/courseApi";
import { useGetValue } from "../../hooks/useGetValue";

const initialState = {
  name: "",
  description: "",
};

const Course = () => {
  const [courseHide, setCourseHide] = useState(false);
  const [createHide, setCreateHide] = useState(false);
  const { data: courseData } = useGetCoursesQuery();
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const [createCourse, { data, isSuccess }] = useCreateCourseMutation();

  const createHandleCourse = (e) => {
    e.preventDefault();
    createCourse(formData);
    console.log(formData);
    setFormData(initialState);
    // navigate("/admin/manageCategory");
  };

  console.log(courseData);

  return (
    <>
      <div className="course">
        <div className="course__top">
          <h2>Kurs Royxati</h2>
          <button
            onClick={() => setCreateHide(true)}
            className="course__create-btn"
          >
            Kurs yaratish
          </button>
        </div>
        <ul>
          {courseData?.map((course) => (
            <li key={course.id}>
              <span>{course.name}</span>
              <div className="course__btn">
                <button onClick={() => setCourseHide(true)}>Tahrirlash</button>
                <button>O'chirish</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {courseHide ? (
        <Module close={setCourseHide} width={500} bg={"#aaa6"}>
          <form className="course__edit" action="">
            <input type="text" placeholder="Edit course name" />
            <button>Saqlash</button>
          </form>
        </Module>
      ) : (
        <></>
      )}
      {createHide ? (
        <Module close={setCreateHide} width={500} bg={"#aaa6"}>
          <div className="course__create">
            <h3>Yangi kurs yaratish</h3>
            <form
              onSubmit={createHandleCourse}
              className="course__edit"
              action=""
            >
              <input
                required
                value={formData.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Enter course name"
              />
              <input
                type="text"
                required
                value={formData.description}
                onChange={handleChange}
                name="description"
                placeholder="Enter course description"
              />
              <button>Yaratish</button>
            </form>
          </div>
        </Module>
      ) : (
        <></>
      )}
    </>
  );
};

export default Course;
