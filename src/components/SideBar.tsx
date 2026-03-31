import "../App.css";
import { SideBarData } from "./SideBarData";
import { useNavigate, useLocation } from "react-router-dom";


export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

    return (
    <div className="SideBar">
      <ul className="SideBarList">
        {SideBarData.map((val, key) => {
          return (
            <li
              key={key}
              className="SideBarRow"
              id={location.pathname == val.link ? "active" : ""}
              onClick={() => {
                navigate(val.link);
              }}
            >
              <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
