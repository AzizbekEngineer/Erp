import React, { useState } from "react";
import "./group.scss";
import Module from "../../components/Module/Module";

const Group = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [course, setCourse] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleTeacherChange = (e) => setTeacher(e.target.value);
  const handleCourseChange = (e) => setCourse(e.target.value);
  const handleGroupNameChange = (e) => setGroupName(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ teacher, course, groupName });
    setIsModalOpen(false);
    setTeacher("");
    setCourse("");
    setGroupName("");
  };

  const groups = [
    { id: 1, name: "Group A", teacher: "Teacher 1", course: "Course 1" },
    { id: 2, name: "Group B", teacher: "Teacher 2", course: "Course 2" },
    { id: 3, name: "Group C", teacher: "Teacher 3", course: "Course 3" },
    { id: 4, name: "Group D", teacher: "Teacher 4", course: "Course 4" },
  ];

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
        {groups.map((group) => (
          <li key={group.id} className="group__item">
            <h3 className="group__name">{group.name}</h3>
            <p className="group__details">Teacher: {group.teacher}</p>
            <p className="group__details">Course: {group.course}</p>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Module close={setIsModalOpen} bg={"#aaa8"}>
          <form className="group__form" onSubmit={handleFormSubmit}>
            <h3>Gurux yaratish</h3>
            <div className="group__field">
              <label htmlFor="teacher">Teacher:</label>
              <select
                id="teacher"
                value={teacher}
                onChange={handleTeacherChange}
              >
                <option value="" disabled>
                  Select a teacher
                </option>
                <option value="Teacher 1">Teacher 1</option>
                <option value="Teacher 2">Teacher 2</option>
                <option value="Teacher 3">Teacher 3</option>
              </select>
            </div>
            <div className="group__field">
              <label htmlFor="course">Course:</label>
              <select id="course" value={course} onChange={handleCourseChange}>
                <option value="" disabled>
                  Select a course
                </option>
                <option value="Course 1">Course 1</option>
                <option value="Course 2">Course 2</option>
                <option value="Course 3">Course 3</option>
              </select>
            </div>
            <div className="group__field">
              <label htmlFor="groupName">Group Name:</label>
              <input
                id="groupName"
                type="text"
                value={groupName}
                onChange={handleGroupNameChange}
                placeholder="Enter group name"
              />
            </div>
            <button className="group__submit" type="submit">
              Submit
            </button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default Group;
