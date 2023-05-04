import "./styles/createRoutine.scss"
import "../styles/page.scss"
import planScheduleImg from './img/plan_schedule.png'
import { useEffect, useState } from "react";
import calendarData from '../../data/calendar.json'
import { TimeManagementError } from "../../func/errorHandler";
import { getCheckedBoxValues } from "../../func/form";
import axios from "axios";
import { getUserIdFromCookie } from "../../func/auth";



function NameForm(props) {

    const nameFormSubmitHandler = () => {
        return (event) => {
            event.preventDefault();
            const NAME_VALUE = event.target["name"].value;
            const PRIORITY_VALUE = parseInt(event.target["priority"].value);
            const DESCRIPTION_VALUE = event.target["description"].value;
    
            try {
    
                if (NAME_VALUE === "") {
                    throw new TimeManagementError("The name value cannot be null")
                }
    
                props.setPage(2);
                props.setFormData({
                    "title": NAME_VALUE,
                    "priority": PRIORITY_VALUE,
                    "description": DESCRIPTION_VALUE
                })
    
    
            } catch (err) {
                if (err instanceof TimeManagementError){
                    err.displayErrorBox()
                } else {
                    throw err;
                }
            }
    
        }
    }

    return (
        <div className="page-container right-page-container form-container" id="name-form-container">
            <h1 id="new-routine">
                Create a new routine
            </h1>
            <p id="slogan">
                Streamline Your Day, Unlock Success, Savor Life
            </p>
            <form onSubmit={nameFormSubmitHandler()}>
                <input type="text" id="name" name="name" placeholder="Name of the routine" /><br />
                <input type="text" id="description" name="description" placeholder="Description of the routine" />
                <div id="priority">
                    <label htmlFor="priority">Priority: </label>
                    <select id="priority" name="priority">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <input type="submit" value="Next"></input>
            </form>
            <span className="step">
                Step 1/ 2
            </span>
        </div>
    )
}

function TimeForm(props) {
    const dayNames = calendarData.dayNames;
    const checkBoxElements = [];
    const generateDaysCheckboxes = () => {

        for (let i = 0; i < 7; i++) {

            checkBoxElements.push(
                <li key={i}>
                    <label htmlFor={dayNames[i].toLowerCase()}>{dayNames[i]}</label>
                    <input type="checkbox" id={dayNames[i].toLowerCase()} className="occurDays" name="occurDays" value={dayNames[i].toUpperCase()} />
                </li>
            )
        }

    }

    generateDaysCheckboxes()

    const handleFormSubmit = async(event) =>{
        event.preventDefault();

        try{
            const OCCUR_DAYS = getCheckedBoxValues("occurDays").map(value=> value.toUpperCase());
            const START_TIME = event.target["start-time"].value;
            const END_TIME = event.target["end-time"].value;
            const START_DATE = event.target["start-date"].value;
            const END_DATE = event.target["end-date"].value;
    
            const ROUTINE_INFO = {
                "occurDay": OCCUR_DAYS,
                "startDate": START_DATE,
                "endDate": END_DATE,
                "startTime": START_TIME,
                "endTime": END_TIME,
                ...props.formData
            }

    
            const HTTP_RES = await axios.post(`${process.env.REACT_APP_SERVER_URL}/${getUserIdFromCookie()}/daily-routine`, ROUTINE_INFO);

            document.location.replace("/");
        } catch (err) {

        }


    }

    return (
        <div className="page-container right-page-container form-container" id="time-form-container">
            <h1 id="new-routine">
                Create a new routine
            </h1>
            <p id="slogan">
                Streamline Your Day, Unlock Success, Savor Life
            </p>
            <form onSubmit={handleFormSubmit}>
                <ol id="days">
                    {
                        checkBoxElements
                    }
                </ol>
                <div className="date-time-container">
                    <label htmlFor="start-time">Start Time: </label>
                    <input type="time" id="start-time" name="start-time" />
                </div>
                <div className="date-time-container">
                    <label htmlFor="end-time">End Time: </label>
                    <input type="time" id="end-time" name="end-time" />
                </div>
                <div className="date-time-container">
                    <label htmlFor="start-date">Start Date: </label>
                    <input type="date" id="start-date" name="start-date" />
                </div>
                <div className="date-time-container">
                    <label htmlFor="end-date">End Date: </label>
                    <input type="date" id="end-date" name="end-date" />
                </div>
                <input type="submit" value="Submit"></input>
            </form>
            <span className="step">
                Step 2/ 2
            </span>
        </div>
    )
}

export default function CreateRoutinePage() {
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState();

    return (
        <div id="CreateRoutinePage">
            <div className="page-container left-page-container" id="image-container">
                <img src={planScheduleImg} />
            </div>
            {
                page === 1 ? <NameForm setPage={setPage} setFormData={setFormData} /> : <TimeForm formData={formData} />
            }

        </div>
    )
}