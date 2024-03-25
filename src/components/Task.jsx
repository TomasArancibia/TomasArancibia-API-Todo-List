import { useState } from "react";

const Task = (props) => {
    const [visible, setVisible] = useState(false);
    return (
    <>
    <div className="taskDiv" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} >
        <h3 className="taskDetail">{props.id + 1}: &nbsp; {props.detail}</h3>
        {visible ? <button onClick={() =>  props.deleteTask(props.id, props.tasks)} className="display-2 deleteBtn" >X</button> : null}
    </div>
    </>
    )
}

export default Task