import React, { useState, useEffect } from "react";
import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonByIdQuery,
} from "../../../context/api/lessonApi";
import { useParams } from "react-router-dom";
import "./lesson.scss";
import Module from "../../../components/Module/Module";
import { useGetGroupsIdStudentsQuery } from "../../../context/api/groupApi";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { GoTasklist } from "react-icons/go";
import { RiFileInfoLine } from "react-icons/ri";
import { useCreateAssignmentMutation } from "../../../context/api/assigment";

const initialState = {
  lessonName: "",
  lessonNumber: "",
  endDate: "", // Dars tugash vaqtini saqlash uchun
  attendance: [], // Yo'qlama holati
};

const initialStateAssignment = {
  group_id: 35,
  lesson_id: 8,
  assignment: "javascriptda masalalar yechish",
  dueDate: 5,
};

const Lesson = () => {
  const { id } = useParams();
  const { data: lessonsData } = useGetLessonByIdQuery(id);
  const [createLesson] = useCreateLessonMutation();
  const [createAssignment] = useCreateAssignmentMutation();
  const { data: groupStudents } = useGetGroupsIdStudentsQuery(id);
  const [deleteLesson] = useDeleteLessonMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTask, setIsModalTask] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(initialState);

  // Dars boshlanganda barcha o'quvchilarni default true qilish
  useEffect(() => {
    if (groupStudents) {
      const defaultAttendance = groupStudents.map((student) => ({
        studentId: student.id,
        status: true, // Barcha o'quvchilar default true
      }));
      setFormData((prev) => ({ ...prev, attendance: defaultAttendance }));
    }
  }, [groupStudents]);

  // Yo'qlama statusni o'zgartirish
  const handleAttendanceChange = (studentId) => {
    setFormData((prev) => {
      const updatedAttendance = prev.attendance.map((att) =>
        att.studentId === studentId ? { ...att, status: !att.status } : att
      );
      return { ...prev, attendance: updatedAttendance };
    });
  };

  // Dars tugash vaqtini o'zgartirish va vaqtni UTCga o'tkazish
  const handleEndDateChange = (e) => {
    const selectedDate = new Date(e.target.value); // Inputdan olingan vaqt
    const timezoneOffset = selectedDate.getTimezoneOffset() * 60000; // Vaqt zonasini hisobga olish
    const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset); // UTCga o'tkazish
    setFormData({
      ...formData,
      endDate: adjustedDate.toISOString().slice(0, 16), // To'g'ri formatda saqlash
    });
  };

  // Dars yaratish tugmasi
  const createHandleLesson = async (e) => {
    e.preventDefault();

    // Agar barcha o'quvchilar yo'qlanmagan bo'lsa
    if (!formData.attendance.some((att) => att.status)) {
      setErrorMessage("Kamida bitta o'quvchini yo'qlash kerak!");
      return;
    }

    // Dars tugash vaqtini tekshirish
    if (!formData.endDate) {
      setErrorMessage("Dars tugash vaqtini kiriting!");
      return;
    }

    setErrorMessage("");

    // Yaratilgan darsni backendga yuborish
    try {
      await createLesson({ ...formData, groupId: +id });
      setFormData(initialState);
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage("Dars yaratishda xatolik yuz berdi!");
    }
  };

  // Darsni o'chirish
  const handleDelete = async (lessonId) => {
    try {
      await deleteLesson(lessonId);
    } catch (error) {
      setErrorMessage("Darsni o'chirishda xatolik yuz berdi!");
    }
  };

  return (
    <div className="lesson">
      <div className="lesson_top">
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Dars qo'shish
        </button>
      </div>
      <div className="lessons-container">
        {lessonsData?.map(
          ({ id, lessonName, lessonNumber, lessonDate, endDate }) => (
            <div className="lesson-card" key={id}>
              <h3>{lessonNumber}</h3>
              <h3 className="lesson__theme__name">{lessonName}</h3>
              <div className="lesson-card__btns">
                <button>
                  <EditIcon />
                </button>
                <button onClick={() => handleDelete(id)}>
                  <DeleteForeverIcon />
                </button>
              </div>
              <p>
                <strong>Dars boshlanishi:</strong>
                {new Date(lessonDate).toLocaleString()}
              </p>
              <p>
                <strong>Dars tugashi:</strong>
                {new Date(endDate).toLocaleString()}
              </p>
              <div className="lesson__card__info__btn">
                <button
                  onClick={() => {
                    setIsModalTask(true);
                  }}
                >
                  <GoTasklist />
                  <span>Vazifa</span>
                </button>
                <button>
                  <RiFileInfoLine />
                  <span>Malumot</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
      {isModalOpen && (
        <Module close={() => setIsModalOpen(false)} width={800} bg={"#aaa6"}>
          <div className="course__create">
            <h3>Yangi Dars yaratish</h3>
            <form onSubmit={createHandleLesson} className="lesson__edit">
              <input
                required
                value={formData.lessonName}
                onChange={(e) =>
                  setFormData({ ...formData, lessonName: e.target.value })
                }
                name="lessonName"
                type="text"
                placeholder="Dars nomini kiriting"
              />
              <input
                required
                value={formData.lessonNumber}
                onChange={(e) =>
                  setFormData({ ...formData, lessonNumber: e.target.value })
                }
                name="lessonNumber"
                type="text"
                placeholder="Dars raqamini kiriting"
              />
              <input
                required
                type="datetime-local"
                value={formData.endDate}
                onChange={handleEndDateChange}
                name="endDate"
                placeholder="Dars tugash vaqtini tanlang"
              />
              <div className="attendance-list">
                {groupStudents?.map((student) => {
                  const isPresent = formData.attendance.find(
                    (att) => att.studentId === student.id
                  )?.status;

                  return (
                    <div className="attendance-item" key={student.id}>
                      <h4>
                        {student.firstName} {student.lastName}
                      </h4>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={isPresent || false}
                          onChange={() => handleAttendanceChange(student.id)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  );
                })}
              </div>
              {errorMessage && <p className="error">{errorMessage}</p>}
              <button type="submit">Yaratish</button>
            </form>
          </div>
        </Module>
      )}
      {isModalTask && (
        <Module close={() => setIsModalTask(false)} width={800} bg={"#aaa6"}>
          <h1>Task</h1>
        </Module>
      )}
    </div>
  );
};

export default Lesson;
