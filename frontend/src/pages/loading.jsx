import clockImg from './img/clock.png'
import "./styles/loading.scss"
import { useState, useEffect } from 'react'

export function LoadingPage(){

    return (
        <div id="loading">
            <img id="clock" src={clockImg} />
        </div>
    )
}