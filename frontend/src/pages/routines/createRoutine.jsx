import "./styles/createRoutine.scss"
import "../styles/page.scss"
import planScheduleImg from './img/plan_schedule.png'
import { useEffect, useState } from "react";
import calendarData from '../../data/calendar.json'


function nameFormSubmitHandler(setPage) {


    return (event) => {
        event.preventDefault();
        const NAME_VALUE = event.target["name"].value;
        if (NAME_VALUE === "") {
            alert("The name value cannot be null")
        } else {
            setPage(2);
        }
    }

}

function NameForm(props) {
    return (
        <div className="page-container right-page-container form-container" id="name-form-container">
            <h1 id="new-routine">
                Create a new routine
            </h1>
            <p id="slogan">
                Streamline Your Day, Unlock Success, Savor Life
            </p>
            <form onSubmit={nameFormSubmitHandler(props.setPage)}>
                <input type="text" id="name" name="name" placeholder="Name of the routine" /><br />
                <input type="submit" value="Next"></input>
            </form>
            <span className="step">
                Step 1/ 2
            </span>
        </div>
    )
}

function TimeForm() {
    const dayNames = calendarData.dayNames;
    const checkBoxElements = [];
    const generateDaysCheckboxes = () => {

        for (let i = 0; i < 7; i++) {

            checkBoxElements.push(
                <li key={i}>
                    <label htmlFor={dayNames[i].toLowerCase()}>{dayNames[i]}</label>
                    <input type="checkbox" id={dayNames[i].toLowerCase()} name={dayNames[i].toLowerCase()} value={dayNames[i]} />
                </li>
            )
        }

    }
    generateDaysCheckboxes()

    return (
        <div className="page-container right-page-container form-container" id="time-form-container">
            <h1 id="new-routine">
                Create a new routine
            </h1>
            <p id="slogan">
                Streamline Your Day, Unlock Success, Savor Life
            </p>
            <form>
                <ol id="days">
                    {
                        checkBoxElements
                    }
                </ol>
                <div className="time-checkbox-container">
                    <label htmlFor="start-time">Start Time: </label>
                    <input type="time" id="start-time" name="start-time" />
                </div>
                <div className="time-checkbox-container">
                    <label htmlFor="end-time">End Time: </label>
                    <input type="time" id="end-time" name="end-time" />
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
    return (
        <div id="CreateRoutinePage">
            <div className="page-container left-page-container" id="image-container">
                <img src={planScheduleImg} />
            </div>
            {
                page === 1 ? <NameForm setPage={setPage} /> : <TimeForm />
            }

        </div>
    )
}