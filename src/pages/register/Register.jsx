import React from "react";
import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <form className="register__form" action="">
        <div>
          <h3 className="register__form__title">Hisob ochish</h3>
          <p className="register__form__text">
            Davom etish uchun hisob yarating
          </p>
        </div>
        <label htmlFor="">
          Electron pochta
          <input placeholder="esteban_schiller@gmail.com" type="text" />
        </label>
        <label htmlFor="">
          Foydalanuvchi Shaxs
          <input placeholder="Foydalanuvchi shaxs" type="text" />
        </label>
        <label htmlFor="">
          <div className="register__form__info">
            <p>parol</p>
            <span>parol unitdingizmi?</span>
          </div>
          <input placeholder="parol" type="text" />
          <div className="register__form__check">
            <input type="checkbox" />
            Men shart va shartlarni qabul qilaman
          </div>
        </label>
        <button>Ro'yxatdan o'tish</button>
        <p>
          Hisobingiz bormi?
          <Link className="register__form__check-link" to={"/"}>
            Tizimga kirish
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
