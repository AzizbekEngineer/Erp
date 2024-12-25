import "./group.scss";
import Module from "../../components/Module/Module";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupsQuery,
  useUpdateGroupMutation,
} from "../../context/api/groupApi";
import { useGetTeacherQuery } from "../../context/api/teacherApi";
import { useGetCoursesQuery } from "../../context/api/courseApi";
import { useGetValue } from "../../hooks/useGetValue";
import { useState } from "react";

const initialState = {
  name: "",
  courseId: "",
  teacherId: "",
  students: [],
};

const Group = () => {
  const { data: groups } = useGetGroupsQuery();
  const { data: teacherData } = useGetTeacherQuery();
  const { data: courseData } = useGetCoursesQuery();
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const [createGroup] = useCreateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateGroup({ id: currentGroupId, ...formData }).unwrap();
        alert("Group updated successfully!");
      } else {
        await createGroup(formData).unwrap();
        alert("Group created successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error managing group:", error);
      alert("Failed to manage group!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await deleteGroup(id).unwrap();
        alert("Group deleted successfully!");
      } catch (error) {
        console.error("Error deleting group:", error);
        alert("Failed to delete group!");
      }
    }
  };

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

  return (
    <div className="group">
      <div className="group__top">
        <h2 className="group__title">Groups</h2>
        <button
          className="group__create-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Create Group
        </button>
      </div>
      <ul className="group__list">
        {groups?.map((group) => (
          <li key={group.id} className="group__item">
            <div className="group__item-info">
              <h3 className="group__name">{group.name}</h3>
              <p className="group__details">
                Teacher: {group.teacher?.firstName || "Not Assigned"}
              </p>
              <p className="group__details">
                Course: {group.course?.name || "Not Assigned"}
              </p>
            </div>
            <div className="group__actions">
              <button onClick={() => handleEdit(group)}>Edit</button>
              <button onClick={() => handleDelete(group.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Module bg="#aaa4" close={resetForm}>
          <form className="group__form" onSubmit={handleSubmit}>
            <h3>{isEditing ? "Edit Group" : "Create Group"}</h3>
            <div className="group__field">
              <label htmlFor="teacher">Teacher:</label>
              <select
                id="teacher"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select a teacher
                </option>
                {teacherData?.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstName}
                  </option>
                ))}
              </select>
            </div>
            <div className="group__field">
              <label htmlFor="course">Course:</label>
              <select
                id="course"
                name="courseId"
                value={formData.courseId}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select a course
                </option>
                {courseData?.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="group__field">
              <label htmlFor="groupName">Group Name:</label>
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
              {isEditing ? "Update" : "Create"}
            </button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default Group;
