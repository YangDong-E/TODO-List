import React, { useState } from 'react'
import './TodoTemplate.scss'
import Moment from 'react-moment'
import { useInterval } from 'use-interval'

const TodoTemplate = ({ children }) => {
    const [nowTime, setNowtime] = useState(Date.now())

    useInterval(() => {
        setNowtime(Date.now())
    }, 1000)

    return (
        <div className="TodoTemplate">
            <Moment format={'HH:mm'} className="time">
                {nowTime}
            </Moment>
            <div className="app-title">일정 관리</div>
            <div className="content">{children}</div>
        </div>
    )
}

export default TodoTemplate
