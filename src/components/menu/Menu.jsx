import React from "react";
import { TfiMenu } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import "./menu.scss";

function Menu({ setClose }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="products__top">
      <div className="products__top__left">
        <button onClick={() => setClose((p) => !p)}>
          <TfiMenu />
        </button>
        <div className="products__top__left-form">
          <CiSearch />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      <div className="products__top__right">
        <NotificationsIcon />
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          name=""
          id=""
        >
          <option value="uzb"> {t("Uzbek")}</option>
          <option value="rus">{t("Rus")}</option>
        </select>
      </div>
    </div>
  );
}

export default Menu;
