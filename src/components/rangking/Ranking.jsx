// import React, { useState } from "react";
// import "./ranking.scss";

// const students = [
//   { id: 1, name: "Ali Ahmedov" },
//   { id: 2, name: "Malika Karimova" },
//   { id: 3, name: "Jasur Yuldashev" },
//   { id: 4, name: "Ziyoda Usmonova" },
//   { id: 5, name: "Ali Ahmedov" },
//   { id: 6, name: "Malika Karimova" },
//   { id: 7, name: "Jasur Yuldashev" },
//   { id: 8, name: "Ziyoda Usmonova" },
// ];

// const generateLessons = (month, year) => {
//   return Array.from({ length: 20 }, (_, index) => {
//     const date = new Date(year, month, index + 1);
//     return date.toLocaleDateString("uz-UZ", {
//       day: "2-digit",
//       month: "2-digit",
//     });
//   });
// };

// const Ranking = ({ data, id }) => {
//   const [selectedMonth, setSelectedMonth] = useState(11);
//   const [grades, setGrades] = useState({});

//   const lessons = generateLessons(selectedMonth, 2024);

//   const handleGradeChange = (studentId, day, value) => {
//     setGrades((prevGrades) => ({
//       ...prevGrades,
//       [studentId]: {
//         ...prevGrades[studentId],
//         [day]: value,
//       },
//     }));
//   };

//   console.log(data);

//   const handleMonthChange = (event) => {
//     setSelectedMonth(parseInt(event.target.value));
//   };

//   return (
//     <div className="ranking-container">
//       <div className="ranking-top">
//         <nav>
//           <ul>
//             <li className="ranking-title">
//               <a href="#home">Baholar Jadvali</a>
//             </li>
//             <li>
//               <a href="#about">O'quvchilar</a>
//             </li>
//             <select
//               className="ranking-month-select"
//               value={selectedMonth}
//               onChange={handleMonthChange}
//             >
//               {Array.from({ length: 12 }, (_, index) => (
//                 <option key={index} value={index}>
//                   {new Date(2024, index).toLocaleDateString("uz-UZ", {
//                     month: "long",
//                   })}
//                 </option>
//               ))}
//             </select>
//           </ul>
//         </nav>
//       </div>
//       <main className="app-main">
//         <section id="home" className="app-section">
//           <div className="ranking-table-wrapper">
//             <table className="ranking-table">
//               <thead>
//                 <tr>
//                   <th>№</th>
//                   <th className="sticky-col ">O'quvchi</th>
//                   {lessons.map((date, index) => (
//                     <th key={index}>{date}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data?.[0]?.students?.map((student, inx) => (
//                   <tr key={student.id}>
//                     <td>{inx + 1} </td>
//                     <td className="sticky-col student-name">
//                       <span>
//                         {student?.lastName} {student?.firstName}
//                       </span>
//                     </td>
//                     {lessons.map((day, index) => (
//                       <td key={index}>
//                         <input
//                           type="number"
//                           min="-10"
//                           max="10"
//                           placeholder=""
//                           className="grade-input"
//                           value={grades[student.id]?.[day] || ""}
//                           onChange={(e) =>
//                             handleGradeChange(student.id, day, e.target.value)
//                           }
//                         />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <button
//             className="save-button"
//             onClick={() => console.log("Baholar:", grades)}
//           >
//             Baholarni Saqlash
//           </button>
//         </section>

//         <section id="about" className="app-section">
//           <h2>O'quvchilar</h2>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Ranking;

import React, { useState } from "react";
import "./ranking.scss";
import Table from "../table/Table";
import { useLocation } from "react-router-dom";

const generateLessons = (month, year) => {
  return Array.from({ length: 20 }, (_, index) => {
    const date = new Date(year, month, index + 1);
    return date.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
    });
  });
};

const Ranking = ({ data, title }) => {
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [grades, setGrades] = useState({});
  const [activeTab, setActiveTab] = useState("home");

  const lessons = generateLessons(selectedMonth, 2024);
  const location = useLocation();
  const loc = location.pathname.split("/")[2];
  console.log(loc);

  const handleGradeChange = (studentId, day, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [day]: value,
      },
    }));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="ranking-container">
      <div className="ranking-top">
        <nav className="ranking-top">
          <ul>
            <li
              className={`ranking-tab ${activeTab === "home" ? "active" : ""}`}
              onClick={() => handleTabChange("home")}
            >
              {data?.[0].name}
            </li>
            <li
              className={`ranking-tab ${
                activeTab === "students" ? "active" : ""
              }`}
              onClick={() => handleTabChange("students")}
            >
              O'quvchilar
            </li>
          </ul>
          <select
            className="ranking-month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index}>
                {new Date(2024, index).toLocaleDateString("uz-UZ", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </nav>
      </div>
      <main className="app-main">
        {activeTab === "home" && (
          <section id="home" className="app-section">
            <div className="ranking-table-wrapper">
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>№</th>
                    <th className="sticky-col">O'quvchi</th>
                    {lessons.map((date, index) => (
                      <th key={index}>{date}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.[0]?.students?.map((student, inx) => (
                    <tr key={student.id}>
                      <td>{inx + 1}</td>
                      <td className="sticky-col student-name">
                        <span>
                          {student?.lastName} {student?.firstName}
                        </span>
                      </td>
                      {lessons.map((day, index) => (
                        <td key={index}>
                          <input
                            type="number"
                            min="-10"
                            max="10"
                            placeholder=""
                            className="grade-input"
                            value={grades[student.id]?.[day] || ""}
                            onChange={(e) =>
                              handleGradeChange(student.id, day, e.target.value)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="save-button"
              onClick={() => console.log("Baholar:", grades)}
            >
              Baholarni Saqlash
            </button>
          </section>
        )}
        {activeTab === "students" && (
          <section id="students" className="app-section">
            <Table loc={loc} data={data?.[0]?.students} />
          </section>
        )}
      </main>
    </div>
  );
};

export default Ranking;
