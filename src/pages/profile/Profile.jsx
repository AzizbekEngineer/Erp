import React from "react";
import { FaEdit } from "react-icons/fa";
import user from "../../assets/image/user.png";
import "./profile.scss";
import { useGetAdminsQuery } from "../../context/api/adminApi";

const Profile = () => {
  const { data } = useGetAdminsQuery();
  console.log(data);

  // const profile = data?.payload || {};

  return (
    <div></div>
    // <div className="profile">
    //   <div className="profile__container">
    //     <div className="profile__header">
    //       <h2>Shaxsiy ma'lumotlar</h2>
    //     </div>

    //     <div className="profile__content">
    //       <div className="profile__image-section">
    //         <img src={user} alt={`${profile.fname} ${profile.lname}`} />
    //         <p className="profile__image-info">
    //           500x500 o'lcham, JPEG, JPG, PNG format, maksimum 2MB
    //         </p>
    //       </div>

    //       <div className="profile__info-section">
    //         <div className="profile__info-item">
    //           <h4>Ism</h4>
    //           <p>{profile.fname}</p>
    //         </div>

    //         <div className="profile__info-item">
    //           <h4>Familiya</h4>
    //           <p>{profile.lname}</p>
    //         </div>

    //         <div className="profile__info-item">
    //           <h4>Telefon raqam</h4>
    //           <p>{profile.phone}</p>
    //         </div>

    //         <div className="profile__info-item">
    //           <h4>Tug'ilgan sana</h4>
    //           <p>20 Apr, 2002</p>
    //         </div>

    //         <div className="profile__info-item">
    //           <h4>Jinsi</h4>
    //           <p>Male</p>
    //         </div>

    //         <div className="profile__info-item">
    //           <h4>HH ID</h4>
    //           <p>20641</p>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="profile__login-section">
    //       <div className="profile__login-item">
    //         <h4>Parol</h4>
    //         <p>●●●●●●●</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Profile;
