import "./styles/createRoutine.scss"

export function CreateRoutinePage() {
    return (
        <div id="CreateRoutinePage">
            <h1 id="new-routine">
                Create a new routine
            </h1>
            <p id="slogan">
            Streamline Your Day, Unlock Success, Savor Life
            </p>
            <form>
                <input type="text" id="name" name="name" placeholder="Name of the routine" /><br />
                <input type="submit" value="Next"></input>
            </form>
        </div>
    )
}