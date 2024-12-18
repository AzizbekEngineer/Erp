import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./sidebar.scss";
import { GiSilverBullet } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { LuUserPlus } from "react-icons/lu";
import { useGetAdminsQuery } from "../../context/api/adminApi";
import { CiMenuKebab } from "react-icons/ci";
import { LiaWarehouseSolid } from "react-icons/lia";
import { AiOutlineProfile } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";
import img from "../../assets/icons/curse.png";
import { PiRanking } from "react-icons/pi";

function Sidebar() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const [profileHide, setProfileHide] = useState(null);

  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/"); sidebarr
  // };

  const dispatch = useDispatch();

  return (
    <section className="sidebar">
      <div>
        <div className="sidebar__top">
          <div className="sidebar__top__info">
            <button onClick={() => setProfileHide((prev) => !prev)}>A</button>
            <h2>Academy</h2>
          </div>
          <div className="sidebar__top__full">
            <button onClick={() => setProfileHide((prev) => !prev)}>
              <CiMenuKebab />
            </button>
          </div>
        </div>
        <div
          className={`sidebar__profile ${
            profileHide ? "sidebar__profile__hide" : ""
          }`}
        >
          <div className="sidebar__profile__info">
            <Link
              onClick={() => setProfileHide(false)}
              className="sidebar__profile__title"
              to={"profile"}
            >
              <AiOutlineProfile />
              Profile
            </Link>
            <p className="sidebar__profile__title">
              <FaRegEdit />
              O'zgartirish
            </p>
            <p
              className="sidebar__profile__title"
              onClick={() => dispatch(logout())}
            >
              <CiLogout />
              Chiqish
            </p>
          </div>
        </div>

        <ul className="sidebar__item">
          <li className="sidebar__list">
            <NavLink to={"students"} className={"sidebar__left__text"}>
              <FaRegUser />
              {t("o'quvchilar")}
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"createStudents"} className={"sidebar__left__text"}>
              <LuUserPlus />
              {t("o'quvchi Yaratish")}
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"group"} className={"sidebar__left__text"}>
              <LuUserPlus />
              {t("gruhlar")}
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"StudentRating"} className={"sidebar__left__text"}>
              <PiRanking />
              O'quvchilar reytingi
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"ranking"} className={"sidebar__left__text"}>
              <GiSilverBullet />
              O'quvchilar kunlik ball
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"course"} className={"sidebar__left__text"}>
              <img src={img} alt="" width={27} height={30} />
              Kurslar royxati
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"homework"} className={"sidebar__left__text"}>
              <LiaWarehouseSolid />
              Vazifalar
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"teachers"} className={"sidebar__left__text"}>
              <FaRegUser />
              O'qituvchilar
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"createTeacher"} className={"sidebar__left__text"}>
              <LuUserPlus />
              O'qituvchi yaratish
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar__btns">
        <div className="sidebar__btns__title">
          <IoMdSettings />
          <p>Sozlamalar</p>
        </div>
        <div
          className="sidebar__btns__title"
          onClick={() => dispatch(logout())}
        >
          <CiLogout />
          <p>Chiqish</p>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
