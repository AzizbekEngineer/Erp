import React from "react";
import "./course.scss";

const Course = () => {
  return (
    <div className="course">
      <div className="course__top">
        <h2>Create Course</h2>
        <button className="course__create-btn">Create Course</button>
      </div>
      <ul>
        <li>
          <span>Rus tili</span>
          <div className="course__btn">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
        <li>
          <span>Ingliz tili</span>
          <div className="course__btn">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
        <li>
          <span>Matematika</span>
          <div className="course__btn">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
        <li>
          <span>Fizika</span>
          <div className="course__btn">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
        <li>
          <span>Informatika</span>
          <div className="course__btn">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Course;
