import "./App.css";
import User from "./components/User";
import HIcon from "./icons/Person.svg";
import NIcon from "./icons/Nutrition.svg";
import GIcon from "./icons/Gym.svg";
import { Routes, Route } from "react-router-dom";

const data = require("./data.json");

function App() {
  const users = data.map((usr) => {
    return (
      <User
        key={usr.userId}
        UserId={usr.userId}
        Name={usr.name}
        Email={usr.email}
        StepsWalked={usr.stepsWalked}
        StepsTarget={usr.stepsTarget}
        PerformedDate={usr.performedDate}
        ScheduledDate={usr.scheduledDate}
        CalorieIntake={usr.calorieIntake}
        CalorieTarget={usr.calorieTarget}
        ProteinConsumed={usr.proteinConsumed}
        ProteinTarget={usr.proteinTarget}
        CarbConsumed={usr.carbConsumed}
        CarbTarget={usr.carbTarget}
        FatConsumed={usr.fatConsumed}
        FatTarget={usr.fatTarget}
        Feedback={usr.feedback}
      />
    );
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <div className="container">
              <div
                className="nav"
                style={{
                  color: "white",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    listStyle: "none",
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: "18px",
                    gap: "15px",
                    marginLeft: "250px",
                  }}
                >
                  <img src={HIcon} alt="" />
                  <li>Steps</li>
                  <img src={GIcon} alt="" style={{ marginLeft: "75px" }} />
                  <li>Workout</li>
                  <img src={NIcon} alt="" style={{ marginLeft: "100px" }} />
                  <li>Nutrition</li>
                </ul>
              </div>
              {users}
            </div>
          </div>
        }
      />

      <Route path="/:userId/nutrition" element={<div>Nutrition Details</div>} />
      <Route path="/:userId/workout" element={<div>Workout Details</div>} />
    </Routes>
  );
}

export default App;
