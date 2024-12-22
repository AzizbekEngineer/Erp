// import React, { useState } from "react";
// import "./teacher.scss";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
// import {
//   useDeleteTeacherMutation,
//   useGetTeacherQuery,
//   useUpdateTeacherMutation,
// } from "../../../context/api/teacherApi";
// import Module from "../../../components/Module/Module";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const Teachers = () => {
//   const { data } = useGetTeacherQuery();
//   const [deleteTeacher] = useDeleteTeacherMutation();
//   const [updateTeacher] = useUpdateTeacherMutation();

//   const [isEditVisible, setIsEditVisible] = useState(false);
//   const [editFormData, setEditFormData] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     address: "",
//     specialty: "",
//   });

//   const handleDelete = (id) => {
//     if (window.confirm("O'qituvchi o'chirilsinmi?")) {
//       deleteTeacher(id);
//     }
//   };

//   const handleEditClick = (teacher) => {
//     setEditFormData(teacher);
//     setIsEditVisible(true);
//   };

//   const handleEditChange = (field, value) => {
//     setEditFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     updateTeacher(editFormData);
//     setIsEditVisible(false);
//   };

//   return (
//     <div className="teachers">
//       <div className="teacher-list">
//         {data?.map((teacher) => (
//           <div key={teacher.id} className="teacher-card">
//             <h3>
//               {teacher.firstName} {teacher.lastName}
//             </h3>
//             <p>
//               <strong>Manzil:</strong> {teacher.address}
//             </p>
//             <p>
//               <strong>Telefon:</strong> {teacher.phone}
//             </p>
//             <p>
//               <strong>Fan:</strong> {teacher.specialty}
//             </p>
//             <div className="teacher-card-btns">
//               <button className="details-button">Batafsil</button>
//               <button
//                 onClick={() => handleEditClick(teacher)}
//                 className="details-button edit-button"
//               >
//                 <AiOutlineEdit className="icon" /> Tahrirlash
//               </button>
//               <button
//                 onClick={() => handleDelete(teacher.id)}
//                 className="details-button delete-button"
//               >
//                 <AiOutlineDelete className="icon" /> O'chirish
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {isEditVisible && (
//         <Module bg={"#aaa5"} close={() => setIsEditVisible(false)}>
//           <form className="teachers__edit" onSubmit={handleEditSubmit}>
//             <h3 className="teachers__edit-title">O'qituvchini taxrirlash</h3>
//             <label>
//               Ism
//               <input
//                 type="text"
//                 value={editFormData.firstName}
//                 onChange={(e) => handleEditChange("firstName", e.target.value)}
//                 placeholder="Ismingizni kiriting"
//                 required
//               />
//             </label>
//             <label>
//               Familiya
//               <input
//                 type="text"
//                 value={editFormData.lastName}
//                 onChange={(e) => handleEditChange("lastName", e.target.value)}
//                 placeholder="Familiyangizni kiriting"
//                 required
//               />
//             </label>
//             <label>
//               Telefon raqam
//               <PhoneInput
//                 country={"uz"}
//                 value={editFormData.phone}
//                 onChange={(phone) => handleEditChange("phone", phone)}
//                 placeholder="Telefon raqamini kiriting"
//                 inputStyle={{
//                   width: "100%",
//                   padding: "20px 45px",
//                   fontSize: "14px",
//                   border: "1px solid #dcdfe3",
//                   borderRadius: "8px",
//                 }}
//                 buttonStyle={{
//                   background: "#f9fafe",
//                 }}
//               />
//             </label>
//             <label>
//               Manzil
//               <input
//                 type="text"
//                 value={editFormData.address}
//                 onChange={(e) => handleEditChange("address", e.target.value)}
//                 placeholder="Manzilingizni kiriting"
//                 required
//               />
//             </label>
//             <label>
//               Mutaxassislik
//               <input
//                 type="text"
//                 value={editFormData.specialty}
//                 onChange={(e) => handleEditChange("specialty", e.target.value)}
//                 placeholder="Mutaxassislikni kiriting"
//                 required
//               />
//             </label>
//             <button className="teachers__edit-btn" type="submit">
//               O'zgartirish
//             </button>
//           </form>
//         </Module>
//       )}
//     </div>
//   );
// };

// export default Teachers;
import React, { useState } from "react";
import "./teacher.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
  useDeleteTeacherMutation,
  useGetTeacherQuery,
  useUpdateTeacherMutation,
} from "../../../context/api/teacherApi";
import Module from "../../../components/Module/Module";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Teachers = () => {
  const { data } = useGetTeacherQuery();
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    specialty: "",
  });

  const handleDelete = (id) => {
    if (window.confirm("O'qituvchi o'chirilsinmi?")) {
      deleteTeacher(id)
        .unwrap()
        .then(() => {
          alert("O'qituvchi muvaffaqiyatli o'chirildi!");
        })
        .catch((error) => {
          console.error("Delete error:", error);
          alert("Xatolik yuz berdi, qayta urinib ko'ring.");
        });
    }
  };

  const handleEditClick = (teacher) => {
    setEditFormData(teacher);
    setIsEditVisible(true);
  };

  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Ma'lumotlarni tekshirish
    const validatedData = {
      id: editFormData.id,
      firstName: String(editFormData.firstName).trim(),
      lastName: String(editFormData.lastName).trim(),
      phone: String(editFormData.phone).trim(),
      address: String(editFormData.address).trim(),
      specialty: String(editFormData.specialty).trim(),
    };

    if (
      !validatedData.firstName ||
      !validatedData.lastName ||
      !/^\+998\d{9}$/.test(validatedData.phone) ||
      !validatedData.address ||
      !validatedData.specialty
    ) {
      alert("Iltimos, barcha ma'lumotlarni to'g'ri formatda kiriting!");
      return;
    }

    try {
      await updateTeacher(validatedData).unwrap();
      alert("O'qituvchi ma'lumotlari muvaffaqiyatli yangilandi!");
      setIsEditVisible(false);
    } catch (error) {
      console.error("Update error:", error);
      alert("O'qituvchi ma'lumotlarini yangilashda xatolik yuz berdi!");
    }
  };

  return (
    <div className="teachers">
      <div className="teacher-list">
        {data?.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <h3>
              {teacher.firstName} {teacher.lastName}
            </h3>
            <p>
              <strong>Manzil:</strong> {teacher.address}
            </p>
            <p>
              <strong>Telefon:</strong> {teacher.phone}
            </p>
            <p>
              <strong>Fan:</strong> {teacher.specialty}
            </p>
            <div className="teacher-card-btns">
              <button className="details-button">Batafsil</button>
              <button
                onClick={() => handleEditClick(teacher)}
                className="details-button edit-button"
              >
                <AiOutlineEdit className="icon" /> Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(teacher.id)}
                className="details-button delete-button"
              >
                <AiOutlineDelete className="icon" /> O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditVisible && (
        <Module bg={"#aaa5"} close={() => setIsEditVisible(false)}>
          <form className="teachers__edit" onSubmit={handleEditSubmit}>
            <h3 className="teachers__edit-title">O'qituvchini taxrirlash</h3>
            <label>
              Ism
              <input
                type="text"
                value={editFormData.firstName}
                onChange={(e) => handleEditChange("firstName", e.target.value)}
                placeholder="Ismingizni kiriting"
                required
              />
            </label>
            <label>
              Familiya
              <input
                type="text"
                value={editFormData.lastName}
                onChange={(e) => handleEditChange("lastName", e.target.value)}
                placeholder="Familiyangizni kiriting"
                required
              />
            </label>
            <label>
              Telefon raqam
              <PhoneInput
                country={"uz"}
                value={editFormData.phone}
                onChange={(phone) => handleEditChange("phone", phone)}
                placeholder="Telefon raqamini kiriting"
                inputStyle={{
                  width: "100%",
                  padding: "20px 45px",
                  fontSize: "14px",
                  border: "1px solid #dcdfe3",
                  borderRadius: "8px",
                }}
                buttonStyle={{
                  background: "#f9fafe",
                }}
              />
            </label>
            <label>
              Manzil
              <input
                type="text"
                value={editFormData.address}
                onChange={(e) => handleEditChange("address", e.target.value)}
                placeholder="Manzilingizni kiriting"
                required
              />
            </label>
            <label>
              Mutaxassislik
              <input
                type="text"
                value={editFormData.specialty}
                onChange={(e) => handleEditChange("specialty", e.target.value)}
                placeholder="Mutaxassislikni kiriting"
                required
              />
            </label>
            <button className="teachers__edit-btn" type="submit">
              O'zgartirish
            </button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default Teachers;
