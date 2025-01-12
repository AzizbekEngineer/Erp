import React, { useState } from "react";
import {
  useCreateLessonMutation,
  useGetLessonByIdQuery,
} from "../../../context/api/lessonApi";
import { Link, useParams } from "react-router-dom";
import "./lesson.scss";
import { useGetValue } from "../../../hooks/useGetValue";
import Module from "../../../components/Module/Module";

const initialState = {
  title: "",
};

const Lesson = () => {
  const { id } = useParams();
  const { data: lessonsData } = useGetLessonByIdQuery(id);
  const [createLesson] = useCreateLessonMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("id", id);

  const { formData, setFormData, handleChange } = useGetValue(initialState);

  const createHandleLesson = async (e) => {
    e.preventDefault();
    createLesson({ ...formData, groupId: +id });
    setFormData(initialState);
    setIsModalOpen(false);
  };

  return (
    <div className="lesson">
      <div className="lesson_top">
        <button onClick={() => setIsModalOpen(true)}>Dars qo'shish</button>
      </div>
      <div className="lessons-container">
        {lessonsData?.map(({ id, title, lessonDate, endDate }) => (
          <Link to={`/admin/task/${id}`} key={id} className="lesson-card">
            <h3>{title}</h3>
            <p>
              <strong>Lesson Date:</strong>{" "}
              {new Date(lessonDate).toLocaleString()}
            </p>
            <p>
              <strong>End Date:</strong> {new Date(endDate).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
      {isModalOpen && (
        <Module close={setIsModalOpen} width={500} bg={"#aaa6"}>
          <div className="course__create">
            <h3>Yangi Dars yaratish</h3>
            <form onSubmit={createHandleLesson} className="lesson__edit">
              <input
                required
                value={formData.title}
                onChange={handleChange}
                name="title"
                type="text"
                placeholder="Enter course name"
              />
              <button>Yaratish</button>
            </form>
          </div>
        </Module>
      )}
    </div>
  );
};

export default Lesson;
