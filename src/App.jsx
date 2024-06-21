import { useState, useEffect } from 'react'
import './App.css'
import Task from './components/Task'

function App() {
  const [task, setTask] = useState({})
  const [tasks, setTasks] = useState([])
  const [username, setUsername] = useState("tomasarancibia")
  const [user, setUser] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const getTasks = await fetchingTodo(
        `https://playground.4geeks.com/todo/users/${username}`,
        "GET"
      );
      setTasks(Array.isArray(getTasks["todos"]) ? getTasks["todos"] : []);
    }
    fetchData();
  }, [])
  

  const fetchingTodo = async (url, method, body) => {
    console.log(url, method)
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

    const finalOption = method === "GET" ? option2 : option1;

    try {
      const response = await fetch(url, finalOption);
      if (!response.ok) {
        if(response.status == 404){
          fetchingTodo(
            `https://playground.4geeks.com/todo/users/${username}`,
            "POST",
            []
          );
        }
        else
         {
          console.log("Hola estoy en el else", response.status)
          throw new Error("Status error in Fetch")
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  }

  const handleChange = (e) => {
    setTask({
      label: `${e.target.value}`,
      is_done: false
    });
  }

  const handleChangeUser= (e) => {
    setUser(`${e.target.value}`);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      console.log(newTasks)
      fetchingTodo(
        `https://playground.4geeks.com/todo/todos/${username}`,
        "POST",
        newTasks
      );
      setTask({ label: "" });
    }
  }

  const handleClick = async () => {
    await fetchingTodo(
      `https://playground.4geeks.com/todo/users/${username}`,
      "DELETE",
      []
    );
    await fetchingTodo(
      `https://playground.4geeks.com/todo/users/${username}`,
      "POST",
      []
    );
    setTasks([]);
  }
  const ChangeUser = async (e) =>{
    e.preventDefault()
    setTasks([]);
    setUsername(user);  
      fetchingTodo(`https://playground.4geeks.com/todo/users/${username}`,
      "GET");
  }

  const renderTasks = () => tasks?.map((task, index) => (
    <Task key={index} id={index} detail={task.label} />
  ));
  
  return (
    <>
      <div className='activeUser'><p>User: {username} </p></div>
      <div className='activeUser'>
        <form onSubmit={(e) => ChangeUser(e)}>
          <input type="text" value={user} onChange={(e) => handleChangeUser(e)}  placeholder='Select User...'/>
          <button type="submit">Change User</button>
        </form>
      </div>
      <h1 className='title '>To Do List </h1>
      <form>
        <input 
          maxLength={38} 
          minLength={2} 
          type="text" 
          placeholder='Add a task...' 
          onChange={handleChange} 
          onKeyDown={handleKeyDown} 
          value={task.label || ''} 
        />
      </form>
      <div className='postit'>
        {tasks.length === 0 
          ? <div className='taskDiv'><h3 className='taskDetail'>{"Add your first task"}</h3></div>
          : renderTasks()}
      </div>
      <div className='taskCount'>
        <p>{tasks.length} Task left</p>
        <button onClick={handleClick}> Clear List </button>
      </div>
      <div className='postitEnd1'></div>
      <div className='postitEnd2'></div>
    </>
  )
}

export default App