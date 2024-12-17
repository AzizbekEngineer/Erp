import React, { useState } from "react";
import "./course.scss";
import Module from "../../components/Module/Module";

const Course = () => {
  const [courseHide, setCourseHide] = useState(false);
  const [createHide, setCreateHide] = useState(false);

  return (
    <>
      <div className="course">
        <div className="course__top">
          <h2>Create Course</h2>
          <button
            onClick={() => setCreateHide(true)}
            className="course__create-btn"
          >
            Create Course
          </button>
        </div>
        <ul>
          <li>
            <span>Rus tili</span>
            <div className="course__btn">
              <button onClick={() => setCourseHide(true)}>Edit</button>
              <button>Delete</button>
            </div>
          </li>
          <li>
            <span>Ingliz tili</span>
            <div className="course__btn">
              <button onClick={() => setCourseHide(true)}>Edit</button>
              <button>Delete</button>
            </div>
          </li>
          <li>
            <span>Matematika</span>
            <div className="course__btn">
              <button onClick={() => setCourseHide(true)}>Edit</button>
              <button>Delete</button>
            </div>
          </li>
          <li>
            <span>Fizika</span>
            <div className="course__btn">
              <button onClick={() => setCourseHide(true)}>Edit</button>
              <button>Delete</button>
            </div>
          </li>
          <li>
            <span>Informatika</span>
            <div className="course__btn">
              <button onClick={() => setCourseHide(true)}>Edit</button>
              <button>Delete</button>
            </div>
          </li>
        </ul>
      </div>
      {courseHide ? (
        <Module close={setCourseHide} width={500} bg={"#aaa6"}>
          <form className="course__edit" action="">
            <input type="text" />
            <button>save</button>
          </form>
        </Module>
      ) : (
        <></>
      )}
      {createHide ? (
        <Module close={setCreateHide} width={500} bg={"#aaa6"}>
          <div className="course__create">
            <h3>Kurs yaratish</h3>
            <form className="course__edit" action="">
              <input type="text" />
              <button>create</button>
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
