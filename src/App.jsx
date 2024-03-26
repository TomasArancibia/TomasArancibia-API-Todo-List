import { useState, useEffect } from 'react'
import './App.css'
import Task from './components/Task'

function App() {
  const [task, setTask] = useState({})
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const getTasks = await fetchingTodo(
        "https://playground.4geeks.com/apis/fake/todos/user/tomasarancibia",
        "GET");
      setTasks(getTasks);
    }
    fetchData();
  }, [])

  const fetchingTodo = async (url, method, body) => {
    const option1 = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const option2 = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      }
    };

    const finalOption = method == "GET" ? option2 : option1

    try {
      const responce = await fetch(url, finalOption);
      if (!responce.ok) {
        console.log(responce.text()); // Will try to return the exact result as a stri
        throw new Error("Status error in Fetch")
      }
      const data = await responce.json()
      return data;
    } catch (error) {
      console.log(`${error}`)
    }
  }

  const handleChange = (e) => {
    console.log(task)
    setTask(
      {
        label: e.target.value,
        done: false
      })
  }

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      e.preventDefault()
      const newTasks = [...tasks, task  ];
      console.log(newTasks)
      setTasks(newTasks);
      fetchingTodo(
        "https://playground.4geeks.com/apis/fake/todos/user/tomasarancibia",
        "PUT",
        newTasks
      );
    setTask({ label: "" });
    } 
  }

  const handleClick = () => {
      setTasks([]);
      fetchingTodo(
        "https://playground.4geeks.com/apis/fake/todos/user/tomasarancibia",
        "PUT",
        []
      );
    } 

  const renderTasks = () => tasks?.slice(1).map((task, index) => {
    console.log(task)
    return <Task key={index} id={index} detail={task.label} />
  })
  return (
    <>
      <h1 className='title '>To Do List </h1>
      <form >
        <input maxLength={38} minLength={2} type="text" placeholder='Add a task...' onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)}  value={task.label}/>
      </form>
      <div className='postit'>
        {!tasks.length  == 0 ? renderTasks() : <div className='taskDiv'><h3 className='taskDetail'>{"Add your first task"}</h3></div>}
      </div>
      <div className='taskCount'>

        <p>{tasks.length >= 1 ? tasks.length-1: tasks.length} Task left</p>
        <button onClick={handleClick}> Clear List </button>
      </div>
      <div className='postitEnd1'></div>
      <div className='postitEnd2'></div>
    </>
  )
}

export default App
