import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";
import { IoMdSettings } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Groups2SharpIcon from "@mui/icons-material/Groups2Sharp";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Diversity2SharpIcon from "@mui/icons-material/Diversity2Sharp";
import HomeIcon from "@mui/icons-material/Home";

import "./sidebar.scss";

function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [profileHide, setProfileHide] = useState(null);
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
              <NavLink to={"home"} className={"sidebar__left__text"}>
                <HomeIcon />
                {t("Bosh Sahifa")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"students"} className={"sidebar__left__text"}>
                <Groups2SharpIcon />
                {t("O'quvchilar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"createStudents"} className={"sidebar__left__text"}>
                <PersonAddAltSharpIcon />
                {t("O'quvchi Yaratish")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"teachers"} className={"sidebar__left__text"}>
                <PeopleIcon />
                {t("O'qituvchilar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"createTeacher"} className={"sidebar__left__text"}>
                <PersonAddAltSharpIcon />
                {t("O'qituvchi yaratish")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"group"} className={"sidebar__left__text"}>
                <Diversity2SharpIcon />
                {t("Gruhlar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"StudentRating"} className={"sidebar__left__text"}>
                <EqualizerIcon />
                {t("O'quvchilar reytingi")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"homework"} className={"sidebar__left__text"}>
                <AssignmentSharpIcon />
                {t("Vazifalar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"course"} className={"sidebar__left__text"}>
                <AccountTreeIcon />
                {t("Kurslar royxati")}
              </NavLink>
            </li>
          </>
        );
      case "teacher":
        return (
          <>
            <li className="sidebar__list">
              <NavLink to={"groupTeacher"} className={"sidebar__left__text"}>
                <Diversity2SharpIcon />
                {t("Gruhlar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"StudentRating"} className={"sidebar__left__text"}>
                <EqualizerIcon />
                {t("O'quvchilar reytingi")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"homework"} className={"sidebar__left__text"}>
                <AssignmentSharpIcon />
                {t("Vazifalar")}
              </NavLink>
            </li>
          </>
        );
      case "student":
        return (
          <>
            <li className="sidebar__list">
              <NavLink to={"StudentRating"} className={"sidebar__left__text"}>
                <EqualizerIcon />
                {t("O'quvchilar reytingi")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink to={"groupStudent"} className={"sidebar__left__text"}>
                <Diversity2SharpIcon />
                {t("Gruhlar")}
              </NavLink>
            </li>
            {/* <li className="sidebar__list">
              <NavLink to={"ranking"} className={"sidebar__left__text"}>
                <EqualizerIcon />
                Kunlik ball
              </NavLink>
            </li> */}
            <li className="sidebar__list">
              <NavLink to={"homework"} className={"sidebar__left__text"}>
                <AssignmentSharpIcon />
                {t("Vazifalar")}
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
            <h2>CENTRE</h2>
          </Link>
        </div>

        <ul className="sidebar__item">{renderMenuByRole()}</ul>
      </div>
      <div className="sidebar__btns">
        <div className="sidebar__btns__title">
          <IoMdSettings />
          <p className="sidebar__btns-text">{t("Sozlamalar")}</p>
        </div>
        <div
          className="sidebar__btns__title"
          onClick={() => dispatch(logout())}
        >
          <LogoutIcon />
          <p className="sidebar__btns-text">{t("Chiqish")}</p>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
