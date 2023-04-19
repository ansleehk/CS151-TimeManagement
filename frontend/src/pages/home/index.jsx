import "./home.scss"
import ToDoIcon from '../img/check.png'
import { Calendar } from "./calendar.jsx"

function ToDoBox (){
    return (
        <div className="info-box" id="todo">
            <img className="icon" src={ToDoIcon} />
            <span className="title">
                To-Do Items
            </span>
            <ol id="todo-list">
                <li>
                    Homework
                </li>
            </ol>
        </div>
    )
}

function Routine (){
    return (
        <div className="info-box" id="routine">
            <img className="icon" src={ToDoIcon} />
            <span className="title">
                Routine
            </span>
            <ol id="todo-list">
                <li>
                    Sleep
                </li>
            </ol>
        </div>
    )
}

function UpcomingEvent (){
    return (
        <div className="info-box" id="upcomingEvent">
            <img className="icon" src={ToDoIcon} />
            <span className="title">
                Upcoming Event
            </span>
            <ol id="todo-list">
                <li>
                    Study CS-151
                </li>
            </ol>
        </div>
    )
}

export default function HomePage (){
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