import React, { useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import uzb from "../../assets/icons/uzb.webp";
import rus from "../../assets/icons/rus.png";
import "./menu.scss";

function Menu({ setClose }) {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("uzb");

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);

    // Dropdown menyuni yopish
    const dropdown = document.querySelector(".custom-dropdown-options");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  };

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
        <div className="custom-dropdown">
          <div
            className="custom-dropdown-selected"
            onClick={() =>
              document
                .querySelector(".custom-dropdown-options")
                .classList.toggle("show")
            }
          >
            <img
              src={selectedLang === "uzb" ? uzb : rus}
              alt={selectedLang}
              className="lang-icon"
            />
            <span>{t(selectedLang === "uzb" ? "Uzbek" : "Rus")}</span>
          </div>
          <div className="custom-dropdown-options">
            <div
              className="custom-dropdown-option"
              onClick={() => handleLanguageChange("uzb")}
            >
              <img
                src={uzb}
                style={{ width: "30px", height: "30px" }}
                alt="Uzbek"
                className="lang-icon"
              />
              {t("Uzbek")}
            </div>
            <div
              className="custom-dropdown-option"
              onClick={() => handleLanguageChange("rus")}
            >
              <img
                src={rus}
                style={{ width: "30px", height: "30px" }}
                alt="Russian"
                className="lang-icon"
              />
              {t("Rus")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
