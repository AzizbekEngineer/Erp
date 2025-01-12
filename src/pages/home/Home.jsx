import React from "react";
import "./home.scss";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LineChart } from "@mui/x-charts/LineChart";

const Home = () => {
  return (
    <div className="home">
      <h1>Bosh sahifa</h1>

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
          <div className="home__card__info">20</div>
        </div>
      </div>

      <div className="home__gauge">
        <h2>Progress</h2>
        <div className="home__gauge__card">
          <div className="home__gauge__card-left">
            <CircularProgressbar
              value={75}
              maxValue={100}
              text={`75%`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: `#007bff`,
                textColor: "#555",
                trailColor: "#d6d6d6",
              })}
            />
            <h3 className="home__gauge__card-left-text">
              O'quvchilar davomati
            </h3>
          </div>
          <div className="home__gauge__card-right">
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  // area: true,
                },
              ]}
            />
            <h3 className="home__gauge__card-right-title">To'lovlar tarixi</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
