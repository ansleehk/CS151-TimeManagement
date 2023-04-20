import "./styles/calendar.scss";
import { useState } from "react";
import CalendarData from "../data/calendar.json";
import ArrowIcon from "./img/right-arrow.png";
import { getDaysInMonth } from "../func/date.js";

function Day(props) {
  return (
    <div className="day">
      <span>
        {props.day}
      </span>
      <ol>
        <li className="schedule">
          Study
        </li>
        <li className="event">
          Exam
        </li>
      </ol>
    </div>
  );
}


function CalendarDayContainer(props) {
  let dayItems = [];
  const DAYS_IN_A_MONTH = getDaysInMonth(props.date.getFullYear(), props.date.getMonth())
  for (let i = 0; i < DAYS_IN_A_MONTH; i++) {
    dayItems.push(<Day key={i} day={i + 1} />);
  }
  return (
    <main id="calendar-day-container">
      {
        dayItems
      }
    </main>
  );
}

export function Calendar() {

  const [viewDate, setViewDate] = useState(new Date());

  const setMonth = (month) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + month);
    setViewDate(
      newDate
    )
  }

  return (
    <div id="calendar">
      <header id="controller">
        <button className="month-control" id="left" onClick={() => { setMonth(-1) }}>
          <img src={ArrowIcon} />
        </button>
        <span id="viewDate">
          {CalendarData.monthNames[viewDate.getMonth()] +
            ", " +
            viewDate.getFullYear()}
        </span>
        <button className="month-control" id="right" onClick={() => { setMonth(1) }}>
          <img src={ArrowIcon} />
        </button>
      </header>
      <CalendarDayContainer date={viewDate} />
    </div>
  );
}
