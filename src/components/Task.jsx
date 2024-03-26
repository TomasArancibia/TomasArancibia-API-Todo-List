import { useState } from "react";

const Task = (props) => {
    return (
    <>
    <div className="taskDiv">
        <h3 className="taskDetail">{props.id + 1}: &nbsp; {props.detail}</h3>
    </div>
    </>
    )
}

export default Task