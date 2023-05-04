import "./styles/calendar.scss";
import { useEffect, useState } from "react";
import CalendarData from "../data/calendar.json";
import ArrowIcon from "./img/right-arrow.png";
import { getDaysInMonth } from "../func/date.js";
import axios from "axios";
import { getUserIdFromCookie } from "../func/auth";

function Day(props) {
  return (
    <div className="day">
      <span>{props.day}</span>
      <ol>
        {props.activitiesList.map((activity, index) => (
          <li
            key={index}
            className={activity.activityType.toLowerCase()}
          >
            <span className="name">{activity}</span>
            <span className="time">
              {activity.startTime} - {activity.endTime}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}


function CalendarDayContainer(props) {
  let dayItems = [];
  const VIEWING_MONTH = new Date(props.date);
  const DAYS_IN_A_MONTH = getDaysInMonth(props.date.getFullYear(), props.date.getMonth())
  for (let i = 0; i < DAYS_IN_A_MONTH; i++) {
    dayItems.push(<Day key={i} day={i + 1} activitiesList={[]} />);
  }

  let month = (VIEWING_MONTH.getMonth() + 1).toString();
  if (month.length !== 2) month = "0" + month;
  console.log(month)

  const getDaySchedule = async() =>{
    const HTTP_RES = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/${getUserIdFromCookie()}/day-schedule/month/${VIEWING_MONTH.getFullYear()}-${month}`)).data;
    Object.keys(HTTP_RES).forEach((date, index)=>{
      const DATE = new Date(date);
      const DAY = DATE.getDate();
      dayItems[DAY-1] = <Day key={DAY-1} day={DAY} activitiesList={HTTP_RES[index]} />;
      console.log(dayItems)
    })
  }

  useEffect(()=>{ 
    getDaySchedule()
  }, [props.date])

  return (
    <main id="calendar-day-container">
      {
        dayItems
      }
    </main>
  );
}

export function Calendar() {

  const [viewingMonth, setViewingMonth] = useState(new Date());

  const setMonth = (month) => {
    const newDate = new Date(viewingMonth);
    newDate.setMonth(viewingMonth.getMonth() + month);
    setViewingMonth(
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
          {CalendarData.monthNames[viewingMonth.getMonth()] +
            ", " +
            viewingMonth.getFullYear()}
        </span>
        <button className="month-control" id="right" onClick={() => { setMonth(1) }}>
          <img src={ArrowIcon} />
        </button>
      </header>
      <CalendarDayContainer date={viewingMonth} />
    </div>
  );
}
