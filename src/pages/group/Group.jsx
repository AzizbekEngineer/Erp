import React, { useEffect } from "react";
import "./group.scss";
import Module from "../../components/Module/Module";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupsAllQuery,
  useGetGroupsTeacherQuery,
  useUpdateGroupMutation,
} from "../../context/api/groupApi";
import { useGetCoursesQuery } from "../../context/api/courseApi";
import { useGetValue } from "../../hooks/useGetValue";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetTeacherQuery } from "../../context/api/teacherApi";

const initialState = {
  name: "",
  courseId: "",
  teacherId: "",
  students: [],
};

const Group = () => {
  const { data: groups } = useGetGroupsAllQuery();
  const { data: courseData } = useGetCoursesQuery();
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const [createGroup] = useCreateGroupMutation();
  const [deleteGroup, { data, isSuccess }] = useDeleteGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();
  const { data: teacherData } = useGetTeacherQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  console.log("group", groups);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateGroup({ id: currentGroupId, ...formData }).unwrap();
        toast.success("Grux muoffaqiyatli o'zgartirildi");
      } else {
        await createGroup(formData).unwrap();
        toast.success("Grux muoffaqiyatli yaratildi");
      }
      resetForm();
    } catch (error) {
      toast.error("Grux malumotlarida xatolik");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Grux o'chirilsinmi")) {
      deleteGroup(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Grux o'chirildi");
    }
  }, [isSuccess]);

  const handleEdit = (group) => {
    setFormData({
      name: group.name,
      courseId: group.course?.id || "",
      teacherId: group.teacher?.id || "",
      students: group.students || [],
    });
    setCurrentGroupId(group.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData(initialState);
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentGroupId(null);
  };
  console.log(groups);

  return (
    <div className="group">
      <div className="group__top">
        <h2 className="group__title">Gruhlar</h2>
        <button
          className="group__create-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Gruh yaratish
        </button>
      </div>
      <ul className="group__list">
        {groups?.map((group) => (
          <li key={group.id} className="group__item">
            <Link to={`/admin/groups/${group?.course?.id}`}>
              <div className="group__item-info">
                <h3 className="group__name">{group.name}</h3>
                <p className="group__details">
                  O'qituvchi: {group?.teacher?.firstName || "Not Assigned"}
                </p>
                <p className="group__details">
                  Kurs: {group.course?.name || "Not Assigned"}
                </p>
              </div>
            </Link>
            <div className="group__actions">
              <button onClick={() => handleEdit(group)}>Tahrirlash</button>
              <button onClick={() => handleDelete(group.id)}>O'chirish</button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Module bg="#aaa4" close={resetForm}>
          <form className="group__form" onSubmit={handleSubmit}>
            <h3>{isEditing ? "Grux o'zgartirish" : "Grux yaratish"}</h3>
            <div className="group__field">
              <div className="group__field">
                <label htmlFor="course">Kurs:</label>
                <select
                  id="course"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled>
                    Kurs tanlash
                  </option>
                  {courseData?.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <label htmlFor="teacher">O'qituvchi:</label>
              <select
                id="teacher"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  O'qituvchi tanlash
                </option>
                {teacherData?.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstName}
                  </option>
                ))}
              </select>
            </div>

            <div className="group__field">
              <label htmlFor="groupName">Grux nomi:</label>
              <input
                id="groupName"
                name="name"
                type="text"
                placeholder="Enter group name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <button className="group__submit" type="submit">
              {isEditing ? "Yangilash" : "Yaratish"}
            </button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default Group;
