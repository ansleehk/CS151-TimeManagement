import "./styles/menuBar.scss";
import { Link } from "react-router-dom";
import menuIcon from "./img/menu.png";
import { useWindowDimensions } from "../hooks/device.js";

function DesktopMenuBar() {
  return (
    <menu id="DesktopMenuBar">
      <a id="logo" href="/">
        Time Management Tool
      </a>
      <nav id="menu">
        <ul>
          <li>
            <Link to="/calendar"> Calendar </Link>
            <Link to="/dailyRoutine">Daily Routine</Link>
            <Link to="/dailyRoutine">Daily Routine</Link>
          </li>
        </ul>
      </nav>
    </menu>
  );
}

function MobileMenuBar() {
  return (
    <menu id="MobileMenuBar">

    </menu>
  )
}

export function MenuBar() {
  let menu = DesktopMenuBar;
  ;
  return (
    <div>
      {
        useWindowDimensions().width > 1000 ? <DesktopMenuBar /> : <MobileMenuBar />
      }
    </div>
  );
}
