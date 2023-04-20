import "./styles/home.scss"
import ToDoIcon from './img/check.png'
import { Calendar } from "../components/calendar.jsx"
import addImg from './img/add.png'
import { useNavigate } from "react-router-dom";

function ToDoBox() {
    const navigate = useNavigate();

    return (
        <div className="info-box" id="todo">
            <img className="icon" src={ToDoIcon} />
            <span className="title">
                To-Do Items
            </span>
            <div className="upcoming">
                <span className="upcoming">
                    Upcoming:
                </span>
                <span className="activity">

                </span>
            </div>
            <button className="add">
                <img className="plus" src={addImg} />
            </button>
        </div>
    )
}

function Routine() {
    const navigate = useNavigate();

    return (
        <div className="info-box" id="routine">
            <img className="icon" src={ToDoIcon} />
            <span className="title">
                Routine
            </span>
            <div className="upcoming">
                <span className="upcoming">
                    Upcoming:
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
            <img className="icon" src={ToDoIcon} />
            <span className="title">
                Upcoming Event
            </span>
            <div className="upcoming">
                <span className="upcoming">
                    Upcoming:
                </span>
                <span className="activity">

                </span>
            </div>
            <button className="add">
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