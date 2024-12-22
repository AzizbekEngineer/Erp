// import React, { useState } from "react";
// import "./group.scss";
// import Module from "../../components/Module/Module";
// import {
//   useCreateGroupMutation,
//   useGetGroupsQuery,
// } from "../../context/api/groupApi";
// import { useGetTeacherQuery } from "../../context/api/teacherApi";
// import { useGetCoursesQuery } from "../../context/api/courseApi";
// import { useGetValue } from "../../hooks/useGetValue";

// const initialState = {
//   name: "",
//   courseId: 10,
//   teacherId: 5,
//   students: [3],
// };

// const Group = () => {
//   const { data: groups } = useGetGroupsQuery();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { data: teacherData } = useGetTeacherQuery();
//   const { data: courseData } = useGetCoursesQuery();
//   const { formData, setFormData, handleChange } = useGetValue(initialState);
//   const [createGroup] = useCreateGroupMutation();
//   console.log(courseData);

//   return (
//     <div className="group">
//       <div className="group__top">
//         <h2 className="group__title">Gruhlar</h2>
//         <button
//           className="group__create-btn"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Gruh yaratish
//         </button>
//       </div>
//       <ul className="group__list">
//         {groups?.map((group) => (
//           <li key={group.id} className="group__item">
//             <h3 className="group__name">{group.name}</h3>
//             <p className="group__details">Teacher: {group.teacher}</p>
//             <p className="group__details">Course: {group.course}</p>
//           </li>
//         ))}
//       </ul>

//       {isModalOpen ? (
//         <Module bg={"#aaa4"} close={setIsModalOpen}>
//           <form className="group__form">
//             <h3>Gurux yaratish</h3>
//             <div className="group__field">
//               <label htmlFor="teacher">Teacher:</label>
//               <select id="teacher">
//                 <option value="" disabled>
//                   Select a teacher
//                 </option>
//                 {teacherData.map((teacher) => (
//                   <option value={teacher?.id}>{teacher?.firstName}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="group__field">
//               <label htmlFor="course">Course:</label>
//               <select id="course">
//                 <option value="" disabled>
//                   Select a course
//                 </option>
//                 {courseData?.map((course) => (
//                   <option value={course?.id}>{course?.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="group__field">
//               <label htmlFor="groupName">Group Name:</label>
//               <input
//                 id="groupName"
//                 type="text"
//                 placeholder="Enter group name"
//               />
//             </div>
//             <button className="group__submit" type="submit">
//               Submit
//             </button>
//           </form>
//         </Module>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default Group;import React, { useState } from "react";
import "./group.scss";
import Module from "../../components/Module/Module";
import {
  useCreateGroupMutation,
  useGetGroupsQuery,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: teacherData } = useGetTeacherQuery();
  const { data: courseData } = useGetCoursesQuery();
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const [createGroup] = useCreateGroupMutation();

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value), // Stringni raqamga aylantirish
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGroup(formData).unwrap();
      alert("Group created successfully!");
      setIsModalOpen(false);
      setFormData(initialState);
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group!");
    }
  };

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
            <h3 className="group__name">{group.name}</h3>
            <p className="group__details">Teacher: {group.teacher}</p>
            <p className="group__details">Course: {group.course}</p>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Module bg={"#aaa4"} close={setIsModalOpen}>
          <form className="group__form" onSubmit={handleSubmit}>
            <h3>Gurux yaratish</h3>
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
              Submit
            </button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default Group;
