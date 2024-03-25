import { useState, useEffect } from 'react'
import './App.css'
import Task from './components/Task'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(
      fetchingTodo(
        "https://playground.4geeks.com/apis/fake/todos/user/tomasarancibia",
        "GET"
      )
    )
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
    }

    const finalOption = method === "Get" ? option2 : option1

    try {
      const responce = await fetch(url, finalOption);

      if (!responce.ok) {
        throw new Error("Status error in Fetch")
      }
      const data = await responce.json()
      return data;
    } catch (error) {
      console.log(`Error ${error}`)
    }
  }

  const handleChange = (e) => {
    setTask(e.target.value);
  }
  const handleKeyDown = (e) => {
    
      if (e.key === "Enter") {
        e.preventDefault()
        if (task != "") {
        setTasks(prevTasks => [...prevTasks, task]);
        setTask('')
      }
    }
  }

  const deleteTask = (index, list) => {
    list.splice(index, 1);
    setTasks([...list])
    return list
  }

  const renderTasks = () => tasks.map((task, index) => {
    return <Task key={index} id={index} detail={task} tasks={tasks} deleteTask={deleteTask} />
  })
  return (
    <>
      <h1 className='title '>To Do List </h1>
      <form >
        <input maxLength={38} minLength={2} type="text" placeholder='Add a task...' onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} value={task} />
      </form>
      <div className='postit'>
        {!tasks.length == 0 ? renderTasks() : <div className='taskDiv'><h3 className='taskDetail'>{"Add your first task"}</h3></div>}
      </div>
      <div className='taskCount'>
        <p>{tasks.length} Task left</p>
      </div>
      <div className='postitEnd1'></div>
      <div className='postitEnd2'></div>
    </>
  )
}

export default App
