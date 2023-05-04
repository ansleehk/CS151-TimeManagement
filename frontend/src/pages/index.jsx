import "./styles/home.scss"
import ToDoIcon from './img/check.png'
import { Calendar } from "../components/calendar.jsx"
import addImg from './img/add.png'
import starImg from './img/star.png'
import routineImg from './img/routine.png'
import calendarImg from './img/calendar.png'
import { useNavigate } from "react-router-dom";

function ToDoBox() {
    const navigate = useNavigate();

    return (
        <div className="info-box" id="todo">
            <img className="icon" src={starImg} />
            <span className="title">
                Keep it up!
            </span>
            <div className="upcoming">
                <span className="slogan">
                    Good Things Take Time
                </span>
            </div>
        </div>
    )
}

function Routine() {
    const navigate = useNavigate();

    return (
        <div className="info-box" id="routine">
            <img className="icon" src={routineImg} />
            <span className="title">
            Upcoming Routine
            </span>
            <div className="upcoming">
                <span className="upcoming">
                    Study CS-151
                </span>
                <span className="activity">

                </span>
            </div>
            <button className="add" onClick={()=>{navigate("/routine/create")}}>
                <img className="plus" src={addImg} />
            </button>
        </div>
    )
}

function UpcomingEvent() {
    const navigate = useNavigate();

    return (
        <div className="info-box" id="upcomingEvent">
            <img className="icon" src={calendarImg} />
            <span className="title">
                Upcoming Event
            </span>
            <div className="upcoming">
                <span className="upcoming">
                    Watch Film
                </span>
                <span className="activity">

                </span>
            </div>
            <button className="add" onClick={()=>{navigate("/event/create")}}>
                <img className="plus" src={addImg} />
            </button>
        </div>
    )
}

export default function HomePage() {
    return (
        <div id="HomePage">
            <header id="info">
                <ToDoBox />
                <Routine />
                <UpcomingEvent />
            </header>
            <main>
                <Calendar />
            </main>
        </div>
    )
}