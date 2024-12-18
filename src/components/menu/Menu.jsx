import React from "react";
import { TfiMenu } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import "./menu.scss";
import Lenguage from "../lenguage/Lenguage";

function Menu({ setClose }) {
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
        <FaBell />
        <Lenguage />
      </div>
    </div>
  );
}

export default Menu;
