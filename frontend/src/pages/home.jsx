import "./styles/home.scss"
import ToDoIcon from './img/check.png'

function ToDoBox (){
    return (
        <div class="info-box" id="todo">
            <img class="icon" src={ToDoIcon} />
            <span class="title">
                To-Do Items
            </span>
        </div>
    )
}

function Routine (){
    return (
        <div class="info-box" id="routine">
            <img class="icon" src={ToDoIcon} />
            <span class="title">
                Routine
            </span>
        </div>
    )
}

function UpcomingEvent (){
    return (
        <div class="info-box" id="upcomingEvent">
            <img class="icon" src={ToDoIcon} />
            <span class="title">
                Upcoming Event
            </span>
        </div>
    )
}

export function HomePage (){
    return (
        <div id="HomePage">
            <header>
                <ToDoBox />
                <Routine />
                <UpcomingEvent />
            </header>
        </div>
    )
}