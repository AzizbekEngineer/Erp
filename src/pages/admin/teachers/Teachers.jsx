import React from "react";
import "./teacher.scss";

const Teachers = () => {
  const teachers = [
    {
      id: 1,
      name: "Yunus Tursunov",
      address: "Manzil 1",
      phone: "+998 90 123 45 67",
      fan: "Nemis Tili",
    },
    {
      id: 2,
      name: "Ikrom Sharipov",
      address: "Manzil 2",
      phone: "+998 91 987 65 43",
      fan: "Rus Tili",
    },
    {
      id: 3,
      name: "Yunus Tursunov",
      address: "Manzil 1",
      phone: "+998 90 123 45 67",
      fan: "Ingliz Tili",
    },
    {
      id: 4,
      name: "Ikrom Sharipov",
      address: "Manzil 2",
      phone: "+998 91 987 65 43",
      fan: "Matematika",
    },
    {
      id: 5,
      name: "Yunus Tursunov",
      address: "Manzil 1",
      phone: "+998 90 123 45 67",
      fan: "Tarix",
    },
  ];

  return (
    <div className="teachers">
      <div className="teacher-list">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <h3>{teacher.name}</h3>
            <p>
              <strong>Manzil:</strong> {teacher.address}
            </p>
            <p>
              <strong>Telefon:</strong> {teacher.phone}
            </p>
            <p>
              <strong>Fan:</strong> {teacher.fan}
            </p>
            <button className="details-button">Batafsil</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
