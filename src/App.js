import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos,setTodos] = useState([]);
  const [toDo,setTodo] = useState('');
  const [removedTodos,setRemovedTodos] = useState([]);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[new Date().getDay()];

  const getFormattedDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div
      className="app">
      <div className="mainHeading">
        <h1 style={{color:"black"}}>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Hello, it's {currentDay} 🌟 ✨ </h2>
      </div>
      <div className="input">
        <input 
        value={toDo} 
        onChange={(e)=>setTodo(e.target.value)} 
        type="text" 
        placeholder="📝 Add item..." 
        />
        <i onClick={()=>{
          if (toDo.trim()){
            setTodos([...toDos,{id: Date.now(), text: toDo, status: false, addedDate: getFormattedDate()}]);
            setTodo('');
            }
          }}
           className="fas fa-plus"
           ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {

        return (
        <div key={obj.id} className="todo">
          <div className="left">
            <input 
              onChange={(e)=>{
                // console.log(e.target.checked)
                // console.log(obj)
                setTodos(toDos.map(todo => 
                todo.id===obj.id ? { ...todo, status: e.target.checked } : todo
                ));
            }} 
            checked={obj.status} 
            type="checkbox" 
            name="" 
            id="" 
            />
            <p style={{textDecoration: obj.status ? "line-through" : "none"}}>
              {obj.text}</p>
            </div>
            <small style={{ color: "gray" }}>Added on: {obj.addedDate}</small>
          <div className="right">
            <i
              onClick={() => {
                setRemovedTodos((prev) => [...prev, obj]);
                setTodos(toDos.filter((todo) => todo.id !== obj.id));
              }}
             className="fas fa-times"
             ></i>
          </div>
        </div>
        );
        })}

        {toDos.some((obj) => !obj.status) && (
          <>
            <h1 style={{color:"black"}}>Active Task</h1>
            {toDos.map((obj) => {
              if(!obj.status) {
                return(<h1 key={obj.id}> {obj.text} </h1>);
              }
              return null;
            })}
          </>
        )}

        {toDos.some((obj) => obj.status) && (
          <>
            <h1 style={{color:"black"}}>Completed Task</h1>
            {toDos.map((obj) => {
              if(obj.status){
                return(<h1 key={obj.id}>{obj.text}</h1>);
              }
              return null;
            })}
          </>
        )}

        {removedTodos.length > 0 && (
          <>
            <h1 style={{ color: "black" }}>Removed Task</h1>
            {removedTodos.map((obj) => {
              return (<h1 key={obj.id} style={{textDecoration:"line-through"}}>{obj.text}</h1>);
          })}
          </>
        )}
    </div>
  </div>
  );
  
}

export default App;