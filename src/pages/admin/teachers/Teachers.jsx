import React, { useState } from "react";

// O'quvchilar ma'lumotlari (keyinchalik API orqali yuklash mumkin)
const students = [
  { id: 1, name: "Ali Ahmedov" },
  { id: 2, name: "Malika Karimova" },
  { id: 3, name: "Jasur Yuldashev" },
  { id: 4, name: "Ziyoda Usmonova" },
];

const Teachers = () => {
  const [grades, setGrades] = useState({}); // Har bir o'quvchining baholari

  // Bahoni yangilash funksiyasi
  const handleGradeChange = (studentId, day, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [day]: value,
      },
    }));
  };

  // O'quvchilar uchun jadval yaratish
  return (
    <div>
      <h1>Kunlik Baholar Jadvali</h1>
      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>O'quvchi</th>
            <th>Dushanba</th>
            <th>Seshanba</th>
            <th>Chorshanba</th>
            <th>Payshanba</th>
            <th>Juma</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => (
                  <td key={day}>
                    <input
                      type="text"
                      min="1"
                      max="5"
                      placeholder=""
                      style={{
                        border: "1px solid black",
                        width: "40px",
                        height: "40px",
                        textAlign: "center",
                      }}
                      value={grades[student.id]?.[day] || ""}
                      onChange={(e) =>
                        handleGradeChange(student.id, day, e.target.value)
                      }
                    />
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        onClick={() => console.log("Saqlash uchun yuboriladi:", grades)}
      >
        Baholarni Saqlash
      </button>
    </div>
  );
};

export default Teachers;
