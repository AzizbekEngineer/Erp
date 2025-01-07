// import React from "react";
// import "./home.scss";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import CastForEducationIcon from "@mui/icons-material/CastForEducation";
// import PersonIcon from "@mui/icons-material/Person";
// import GroupsIcon from "@mui/icons-material/Groups";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

// const Home = () => {
//   return (
//     <div className="home">
//       <h1>Bosh sahifa</h1>
//       <div className="home__cards">
//         <div className="home__card">
//           <div className="home__card__icons">
//             <CreditCardIcon />
//             <h4>Jami</h4>
//           </div>
//           <div className="home__card__info">500</div>
//         </div>

//         <div className="home__card">
//           <div className="home__card__icons">
//             <PersonIcon />
//             <h4>Faol O'quvchilar</h4>
//           </div>
//           <div className="home__card__info">300</div>
//         </div>

//         <div className="home__card">
//           <div className="home__card__icons">
//             <GroupsIcon />
//             <h4>Guruhlar</h4>
//           </div>
//           <div className="home__card__info">20</div>
//         </div>

//         <div className="home__card">
//           <div className="home__card__icons">
//             <ErrorOutlineIcon />
//             <h4>Qarzdorlar</h4>
//           </div>
//           <div className="home__card__info">10</div>
//         </div>
//       </div>
//       <div>
//         <div>
//           <Gauge
//             value={75}
//             startAngle={-110}
//             endAngle={110}
//             sx={{
//               [`& .${gaugeClasses.valueText}`]: {
//                 fontSize: 40,
//                 transform: "translate(0px, 0px)",
//               },
//             }}
//             text={({ value, valueMax }) => `${value} / ${valueMax}`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import "./home.scss";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Gauge, gaugeClasses } from "@mui/x-charts";

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
          <div className="home__card__info">10</div>
        </div>
      </div>

      {/* Gauge Diagramma */}
      <div className="home__gauge">
        <Gauge
          value={75}
          valueMax={100}
          startAngle={-110}
          endAngle={110}
          thickness={20}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: "1.5rem",
              fill: "#555",
            },
          }}
          text={({ value, valueMax }) => `${value}%`}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Home;
