import "./styles/calendar.scss";
import { useEffect, useState } from "react";
import CalendarData from "../data/calendar.json";
import ArrowIcon from "./img/right-arrow.png";
import { getDaysInMonth } from "../func/date.js";
import axios, { AxiosError } from "axios";
import { getUserIdFromCookie } from "../func/auth";

function Day(props) {

  const DATE = new Date(props.day).toISOString().slice(0, 10);

  const [activityElements, setActivityElements] = useState([]);

  const fetchActivitiesList = async () => {

    const fetchEvent = async (eventId) => {
      const HTTP_RES = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/${getUserIdFromCookie()}/event/${eventId}`)).data
      return HTTP_RES;
    }

    const fetchDailyRoutine = async (routineId) => {
      const HTTP_RES = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/${getUserIdFromCookie()}/daily-routine/${routineId}`)).data
      return HTTP_RES;
    }

    try {
      const HTTP_RES = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/${getUserIdFromCookie()}/day-schedule/day/${DATE}`)).data;
  
      const activitiesList = new Array(...HTTP_RES);
  
      const activityElementPromises = activitiesList.map(async (activity, index) => {
        const ACTIVITY_ORIGIN_ID = activity["originActivityId"];
  
        if (activity["activityType"] === "Event") {
          const EVENT_INFO = await fetchEvent(ACTIVITY_ORIGIN_ID);
          return (
            <li className="event" key={index}>
              <span className="name">{EVENT_INFO["title"]}</span>
              <span className="priority">{EVENT_INFO["priority"]}</span>
              <div className="activityInfo"></div>
            </li>
          );
        } else {
          const ROUTINE_INFO = await fetchDailyRoutine(ACTIVITY_ORIGIN_ID);
          return (
            <li className="routine" key={index}>
              <span className="name">{ROUTINE_INFO["title"]}</span>
              <span className="priority">{ROUTINE_INFO["priority"]}</span>
              <div className="activityInfo"></div>
            </li>
          );
        }
      });
  
      const resolvedActivityElements = await Promise.all(activityElementPromises);
      setActivityElements(resolvedActivityElements);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status !== 404) throw err;
      }
    }

  }

  useEffect(() => {
    fetchActivitiesList()
  }, [])

  return (
    <div className="day">
      <span>
        {props.day.getDate()}
      </span>
      <ol>
        {
          activityElements
        }
      </ol>
    </div>
  );
}


function CalendarDayContainer(props) {
  let dayItems = [];
  const VIEWING_MONTH = new Date(props.date);
  const DAYS_IN_A_MONTH = getDaysInMonth(props.date.getFullYear(), props.date.getMonth());

  for (let i = 1; i < DAYS_IN_A_MONTH; i++) {
    let dayOfMonth = i.toString();
    if (dayOfMonth.length !== 2) dayOfMonth = "0" + dayOfMonth;


    const COMPLETE_DAY = new Date(`${VIEWING_MONTH.getFullYear()}-${VIEWING_MONTH.getMonth() + 1}-${dayOfMonth}`);
    dayItems.push(<Day key={i - 1} day={COMPLETE_DAY} />);
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