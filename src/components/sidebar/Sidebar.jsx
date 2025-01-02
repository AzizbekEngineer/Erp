import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";
import { GiSilverBullet } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { LuUserPlus } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";
import { LiaWarehouseSolid } from "react-icons/lia";
import { AiOutlineProfile } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";
import img from "../../assets/icons/curse.png";

import "./sidebar.scss";

function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileHide, setProfileHide] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Tokenni decoding qilishda xatolik:", error);
      }
    }
  }, []);

  const renderMenuByRole = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <li className="sidebar__list">
              <NavLink to={"students"} className={"sidebar__left__text"}>
                <FaRegUser />
                {t("O'quvchilar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"createStudents"} className={"sidebar__left__text"}>
                <LuUserPlus />
                {t("O'quvchi Yaratish")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"teachers"} className={"sidebar__left__text"}>
                <FaRegUser />
                {t("O'qituvchilar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"createTeacher"} className={"sidebar__left__text"}>
                <LuUserPlus />
                {t("O'qituvchi yaratish")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"group"} className={"sidebar__left__text"}>
                <LuUserPlus />
                {t("Gruhlar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"StudentRating"} className={"sidebar__left__text"}>
                <LuUserPlus />
                {t("O'quvchilar reytingi")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"homework"} className={"sidebar__left__text"}>
                <LiaWarehouseSolid />
                {t("Vazifalar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"course"} className={"sidebar__left__text"}>
                <img src={img} alt="" width={27} height={30} />
                {t("Kurslar royxati")}
              </NavLink>
            </li>
          </>
        );
      case "teacher":
        return (
          <>
            <li className="sidebar__list">
              <NavLink to={"group"} className={"sidebar__left__text"}>
                <LuUserPlus />
                {t("Gruhlar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"StudentRating"} className={"sidebar__left__text"}>
                <PiRanking />
                {t("O'quvchilar reytingi")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"homework"} className={"sidebar__left__text"}>
                <LiaWarehouseSolid />
                {t("Vazifalar")}
              </NavLink>
            </li>
          </>
        );
      case "student":
        return (
          <>
            <li className="sidebar__list">
              <NavLink to={"ranking"} className={"sidebar__left__text"}>
                <GiSilverBullet />
                {t("O'quvchilar kunlik ball")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"course"} className={"sidebar__left__text"}>
                <img src={img} alt="" width={27} height={30} />
                {t("Kurslar royxati")}
              </NavLink>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="sidebar">
      <div>
        <div className="sidebar__top">
          <Link
            onClick={() => setProfileHide(false)}
            className="sidebar__top__info"
            to={"profile"}
          >
            <button>A</button>
            <h2>AKE FOREX</h2>
          </Link>
        </div>

        <ul className="sidebar__item">{renderMenuByRole()}</ul>
      </div>
      <div className="sidebar__btns">
        <div className="sidebar__btns__title">
          <IoMdSettings />
          <p>{t("Sozlamalar")}</p>
        </div>
        <div
          className="sidebar__btns__title"
          onClick={() => dispatch(logout())}
        >
          <CiLogout />
          <p>{t("Chiqish")}</p>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
