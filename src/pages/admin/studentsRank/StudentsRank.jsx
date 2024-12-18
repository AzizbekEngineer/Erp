// StudentRating.js
import React from "react";
import "./studentsRating.scss";

const students = [
  {
    id: 1,
    name: "Aliyev Alisher",
    address: "Tashkent",
    group: "A1",
    score: 95,
  },
  {
    id: 2,
    name: "Karimova Madina",
    address: "Tashkent",
    group: "A2",
    score: 90,
  },
  {
    id: 3,
    name: "Tursunov Shaxzod",
    address: "Tashkent",
    group: "B1",
    score: 88,
  },
  // Qo'shimcha ma'lumotlarni kiriting
];

const StudentRating = () => {
  return (
    <div className="student-rating">
      <table className="rating-table">
        <thead>
          <tr>
            <th>O'rni</th>
            <th>Ism </th>
            <th>Familiya</th>
            <th>Manzill</th>
            <th>Gruhi</th>
            <th>Ball</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name.split(" ")[1]}</td>
              <td>{student.name.split(" ")[0]}</td>
              <td>{student.address}</td>
              <td>{student.group}</td>
              <td>{student.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRating;
