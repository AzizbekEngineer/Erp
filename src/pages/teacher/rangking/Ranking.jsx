import React, { useState } from "react";
import "./ranking.scss";

const students = [
  { id: 1, name: "Ali Ahmedov" },
  { id: 2, name: "Malika Karimova" },
  { id: 3, name: "Jasur Yuldashev" },
  { id: 4, name: "Ziyoda Usmonova" },
  { id: 5, name: "Ali Ahmedov" },
  { id: 6, name: "Malika Karimova" },
  { id: 7, name: "Jasur Yuldashev" },
  { id: 8, name: "Ziyoda Usmonova" },
];

const generateLessons = (month, year) => {
  return Array.from({ length: 20 }, (_, index) => {
    const date = new Date(year, month, index + 1);
    return date.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
    });
  });
};

const Ranking = () => {
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [grades, setGrades] = useState({});

  const lessons = generateLessons(selectedMonth, 2024);

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

  return (
    <div className="ranking-container">
      <div className="ranking-top">
        <h1 className="ranking-title">Kunlik Baholar Jadvali</h1>
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
      </div>
      <div className="ranking-table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr>
              <th className="sticky-col ">O'quvchi</th>
              {lessons.map((date, index) => (
                <th key={index}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="sticky-col student-name">{student.name}</td>
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
    </div>
  );
};

export default Ranking;
