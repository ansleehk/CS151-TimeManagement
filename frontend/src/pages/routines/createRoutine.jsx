import "./styles/createRoutine.scss"

export function CreateRoutinePage() {
    return (
        <div id="CreateRoutinePage">
            <h1>
                Create a new routine
            </h1>
            <form>
                <input type="text" id="name" name="name" placeholder="Name of the routine" />
            </form>
        </div>
    )
}