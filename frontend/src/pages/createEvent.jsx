import "./routines/styles/createRoutine.scss"
import "./styles/page.scss"
import studentStressedOut from './img/student_stressed_out.png'
import { useEffect, useState } from "react";
import { TimeManagementError } from "../func/errorHandler";
import { getCheckedBoxValues } from "../func/form";
import axios from "axios";
import { getUserIdFromCookie } from "../func/auth";



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
                Create a new event
            </h1>
            <p id="slogan">
                Streamline Your Day, Unlock Success, Savor Life
            </p>
            <form onSubmit={nameFormSubmitHandler()}>
                <input type="text" id="name" name="name" placeholder="Name of the event" /><br />
                <input type="text" id="description" name="description" placeholder="Description of the event" />
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

    const handleFormSubmit = async(event) =>{
        event.preventDefault();

        try{
            const START_TIME = event.target["start-time"].value;
            const END_TIME = event.target["end-time"].value;
    
            const ROUTINE_INFO = {
                "startTime": START_TIME,
                "endTime": END_TIME,
                ...props.formData
            }

            console.log(ROUTINE_INFO)

    
            const HTTP_RES = await axios.post(`${process.env.REACT_APP_SERVER_URL}/${getUserIdFromCookie()}/event`, ROUTINE_INFO);

            document.location.replace("/");

        } catch (err) {

        }


    }

    return (
        <div className="page-container right-page-container form-container" id="time-form-container">
            <h1 id="new-routine">
                Create a new event
            </h1>
            <p id="slogan">
                Streamline Your Day, Unlock Success, Savor Life
            </p>
            <form id="event" onSubmit={handleFormSubmit}>

                <div className="date-time-container">
                    <label htmlFor="start-time">Start Time: </label>
                    <input type="datetime-local" id="start-time" name="start-time" />
                </div>
                <div className="date-time-container">
                    <label htmlFor="end-time">End Time: </label>
                    <input type="datetime-local" id="end-time" name="end-time" />
                </div>
                <input type="submit" value="Submit"></input>
            </form>
            <span className="step">
                Step 2/ 2
            </span>
        </div>
    )
}

export default function CreateEventPage() {
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState();

    return (
        <div id="CreateRoutinePage">
            <div className="page-container left-page-container" id="image-container">
                <img src={studentStressedOut} />
            </div>
            {
                page === 1 ? <NameForm setPage={setPage} setFormData={setFormData} /> : <TimeForm formData={formData} />
            }

        </div>
    )
}