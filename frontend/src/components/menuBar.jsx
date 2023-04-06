import "./styles/menuBar.scss";
import { Link } from "react-router-dom";
import SettingIcon from "./img/settings.png";
import { useWindowDimensions } from "../hooks/device.js";

function DesktopMenuBar() {
  return (
    <menu id="DesktopMenuBar">
      <a id="logo" href="/">
        Time Management Tool
      </a>
      <div id="setting-dropdown">
        <button id="setting-btn">
          <img src={SettingIcon} />
        </button>
        <menu id="setting">
          <ul>
            <li>
              <Link to="/auth/login"> Login </Link>
              <Link to="/auth/register"> Register </Link>
            </li>
          </ul>
        </menu>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/calendar"> Calendar </Link>
            <Link to="/dailyRoutine">Daily Routine</Link>
            <Link to="/dailyRoutine">Daily Routine</Link>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </menu>
  );
}

function MobileMenuBar() {
  return <menu id="MobileMenuBar"></menu>;
}

export function MenuBar() {
  let menu = DesktopMenuBar;
  return (
    <div>
      {useWindowDimensions().width > 1000 ? (
        <DesktopMenuBar />
      ) : (
        <MobileMenuBar />
      )}
    </div>
  );
}
