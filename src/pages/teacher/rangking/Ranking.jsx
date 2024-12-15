import React, { useState } from "react";
import "./ranking.scss";

const students = [
  { id: 1, name: "Ali Ahmedov" },
  { id: 2, name: "Malika Karimova" },
  { id: 3, name: "Jasur Yuldashev" },
  { id: 4, name: "Ziyoda Usmonova" },
];

const lessons = Array.from({ length: 20 }, (_, index) => {
  const date = new Date(2024, 11, index + 1);
  return date.toLocaleDateString("uz-UZ", { day: "2-digit", month: "2-digit" });
});

const Ranking = () => {
  const [grades, setGrades] = useState({});

  const handleGradeChange = (studentId, day, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [day]: value,
      },
    }));
  };

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">Kunlik Baholar Jadvali</h1>
      <div className="ranking-table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr>
              <th className="sticky-col">O'quvchi</th>
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
