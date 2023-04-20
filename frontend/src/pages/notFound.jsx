import studentStressedOutImg from "./img/student_stressed_out.png"
import "./styles/notFound.scss"

export default function Error404 (){
    return (
        <div id="not-found-container">
            <h1>
                Page Not Found
            </h1>
            <img src={studentStressedOutImg} />
        </div>
    )
}