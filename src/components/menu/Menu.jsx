import React from "react";
import { TfiMenu } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
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
          <input placeholder={t("Search")} type="text" />
        </div>
      </div>

      <div className="products__top__right">
        <FaBell />
        <div className="products__top__right__custom-select">
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            name="lang"
            id="lang"
          >
            <option value="uzb">{t("Uzbek")}</option>
            <option value="rus">{t("Rus")}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Menu;
