import planScheduleImg from './img/plan_schedule.png'
import "./styles/viewRoutine.scss"
import "../styles/page.scss"
import axios from 'axios'
import { getUserIdFromCookie } from '../../func/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ViewRoutinePage() {

    const [routineElementList, setRoutineElementList] = useState(new Array());
    const fetchRoutines = async () => {
        const HTTP_RES = await axios.get(`${process.env.REACT_APP_SERVER_URL}/${getUserIdFromCookie()}/daily-routine`);
        const rawRoutineList = new Array(...HTTP_RES.data);
    
        const tempRoutineElementList = [];
    
        rawRoutineList.forEach((routine, index) => {
            const occurDays = routine["occurDay"];
            const occurDayElements = [];
            occurDays.forEach((day, dayIndex) => {
                occurDayElements.push(
                    <li className='occurDaysOfWeek' key={dayIndex}>
                        {day.slice(0, 3)}
                    </li>
                )
            })

            console.log(routine)
    
            tempRoutineElementList.push(
                <Link to={`/routine/update/${routine["id"]}`}>
                <li className='routine' key={index}>
                    <span id="priority">
                        {routine["priority"]}
                    </span>
                    <div id="routine-info">
                        <span id="title">
                            {routine["title"]}
                        </span>
                        <p id="description">
                            {routine["description"]}
                        </p>
                    </div>
                    <div id="time">
                        <span id="start">
                            From: {routine["startTime"]}
                        </span><br></br>
                        <span id="end">
                            To: {routine["endTime"]}
                        </span>
                    </div>
                    <div id="occur-days">
                        <ul>
                            {
                                occurDayElements
                            }
                        </ul>
                    </div>
                </li>
                </Link>
            )
        })
    
        setRoutineElementList(tempRoutineElementList);
    }

    useEffect(()=>{
        fetchRoutines()
    }, [])


    return (
        <div id="view-routine-page">
            <div className="page-container left-page-container" id="image-container">
                <img src={planScheduleImg} />
            </div>
            <div className="page-container right-page-container" id="routine-box">
                <h1>
                    Daily Routines
                </h1>
                <div id="routine-list-container">
                    <ul>
                        {
                            routineElementList
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}