import React from "react";
import "./teacher.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"; // React Icons
import {
  useDeleteTeacherMutation,
  useGetTeacherQuery,
} from "../../../context/api/teacherApi";

const Teachers = () => {
  const { data } = useGetTeacherQuery();
  const [deleteTeacher] = useDeleteTeacherMutation();

  const handleDelete = (id) => {
    if (window.confirm("O'qituvchi o'chirilsinmi?")) {
      deleteTeacher(id);
    }
  };

  return (
    <div className="teachers">
      <div className="teacher-list">
        {data?.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <h3>
              {teacher?.firstName} {teacher?.lastName}
            </h3>
            <p>
              <strong>Manzil:</strong> {teacher?.address}
            </p>
            <p>
              <strong>Telefon:</strong> {teacher?.phone}
            </p>
            <p>
              <strong>Fan:</strong> {teacher?.specialty}
            </p>
            <div className="teacher-card-btns">
              <button className="details-button">Batafsil</button>
              <button className="details-button edit-button">
                <AiOutlineEdit className="icon" /> Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(teacher?.id)}
                className="details-button delete-button"
              >
                <AiOutlineDelete className="icon" /> O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
