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
  group_id: null, // Initialize to null
  lesson_id: null, // Initialize to null
  assignment: "", // Initialize to empty string
  dueDate: "", // Initialize dueDate
};

const Lesson = () => {
  const { id } = useParams();
  const { data: lessonsData } = useGetLessonByIdQuery(id);
  const [createLesson] = useCreateLessonMutation();
  const [createAssignment] = useCreateAssignmentMutation(
    initialStateAssignment
  );
  const { data: groupStudents } = useGetGroupsIdStudentsQuery(id);
  const [deleteLesson] = useDeleteLessonMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTask, setIsModalTask] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [assignmentFormData, setAssignmentFormData] = useState(
    initialStateAssignment
  ); // Separate state for assignment form
  const [selectedLessonId, setSelectedLessonId] = useState(null); // Store the ID of the lesson for assignment

  useEffect(() => {
    if (lessonsData && selectedLessonId) {
      const selectedLesson = lessonsData.find(
        (lesson) => lesson.id === selectedLessonId
      );
      if (selectedLesson) {
        setAssignmentFormData((prev) => ({
          ...prev,
          lesson_id: Number(selectedLesson.id), // Explicitly convert to Number
          group_id: Number(id), // Explicitly convert to Number
        }));
      }
    }
  }, [lessonsData, selectedLessonId, id]);

  const createHandleAssignment = async (e) => {
    e.preventDefault();

    // ... validation

    try {
      console.log("Sending assignment data:", assignmentFormData); // Debugging: Check data *before* sending

      const response = await createAssignment(assignmentFormData).unwrap(); // Unwrap for better error handling
      console.log("Assignment created successfully:", response);

      setAssignmentFormData(initialStateAssignment);
      setIsModalTask(false);
    } catch (error) {
      console.error("Error creating assignment:", error);
      if (error.status === 400 && error.data && error.data.message) {
        console.error("Backend validation errors:", error.data.message);
        setErrorMessage(error.data.message.join("\n")); // Display all error messages
      } else if (error.status === 400) {
        setErrorMessage("Bad Request. Please check your input.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

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
                  <span>Baxolash</span>
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
          <h2>Dars boyicha topshiriqni yozish</h2>
          <form onSubmit={createHandleAssignment} className="lesson__tasks">
            <textarea
              required
              value={assignmentFormData.assignment}
              onChange={(e) =>
                setAssignmentFormData({
                  ...assignmentFormData,
                  assignment: e.target.value,
                })
              }
              name="assignment"
              type="text"
              placeholder="Dars boyicha topshiriqni yozish"
            />
            <input
              required
              type="datetime-local"
              value={assignmentFormData.dueDate}
              onChange={(e) =>
                setAssignmentFormData({
                  ...assignmentFormData,
                  dueDate: e.target.value,
                })
              }
              name="dueDate"
              placeholder="Topshiriq tugash vaqtini tanlang"
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button type="submit">Yaratish</button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default Lesson;
