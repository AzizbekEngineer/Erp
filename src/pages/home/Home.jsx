import React from "react";
import "./home.scss";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Home = () => {
  return (
    <div className="home">
      <h1>Asosiy Sahifa</h1>
      <div className="home__cards">
        <div className="home__card">
          <div className="home__card__icons">
            <CreditCardIcon />
            <h4>Jami</h4>
          </div>
          <div className="home__card__info">500</div>
        </div>

        <div className="home__card">
          <div className="home__card__icons">
            <PersonIcon />
            <h4>Faol O'quvchilar</h4>
          </div>
          <div className="home__card__info">300</div>
        </div>

        <div className="home__card">
          <div className="home__card__icons">
            <GroupsIcon />
            <h4>Guruhlar</h4>
          </div>
          <div className="home__card__info">20</div>
        </div>

        <div className="home__card">
          <div className="home__card__icons">
            <ErrorOutlineIcon />
            <h4>Qarzdorlar</h4>
          </div>
          <div className="home__card__info">10</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
