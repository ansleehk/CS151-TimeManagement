import "./styles/menuBar.scss";
import { Link } from "react-router-dom";

export function MenuBar() {
  return (
    <menu id="MenuBar">
      <a id="logo" href="/">
        Time Management Tool
      </a>
      <nav>
        <ul>
          <li>
            <Link to="/calendar"> Calendar </Link>
            <Link to="/dailyRoutine">Daily Routine</Link>
          </li>
        </ul>
      </nav>
    </menu>
  );
}
