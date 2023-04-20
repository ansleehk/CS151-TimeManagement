import "./styles/menuBar.scss";
import { Link } from "react-router-dom";
import userIcon from "./img/user.png";
import { useWindowDimensions } from "../hooks/device.js";

function DesktopMenuBar() {
  return (
    <menu id="DesktopMenuBar">
      <a id="logo" href="/">
        Time Management Tool
      </a>
      <div id="user" className="dropdown-btn-container">
        <button id="setting-btn">
          <img src={userIcon} />
        </button>
        <menu className="dropdown">
          <ul className="menu-selection">
            <li>
              <Link to="/auth/login"> Login </Link>
            </li>
            <li>
              <Link to="/auth/register"> Register </Link>
            </li>
          </ul>
        </menu>
      </div>
      <nav>
        <ul>
          <li>
          <Link to="/calendar"> Calendar </Link>
          </li>

          <li>
            <div id="routine" className="dropdown-btn-container">
              <span>
                Daily Routine
              </span>
              <menu className="dropdown">
                <ul className="menu-selection">
                  <li>
                    <Link to="/routine"> View </Link>
                  </li>
                  <li>
                    <Link to="/routine/create"> Create </Link>
                  </li>
                </ul>
              </menu>
            </div>
          </li>
          <li>
            <div id="event" className="dropdown-btn-container">
              <span>
                Event
              </span>
              <menu className="dropdown">
                <ul className="menu-selection">
                  <li>
                    <Link to="/event/new"> Create </Link>
                  </li>
                </ul>
              </menu>
            </div>
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
