import { useState } from "react"
import { useEffect } from "react"
import TodoForm from "./TodoForm"
import TodoRender from "./TodoRender"
import axios from 'axios'


function App() {
 
const [todos,setTodos]=useState([])

useEffect(()=>{
    
    axios.get('http://localhost:3000/todos')
    .then((response)=>{
      console.log(response.data)
      setTodos(response.data)
    }).catch((err)=>{
      console.log(err)
    })
   
},[])

const addTodo = (newTodo) =>{
  setTodos((prevTodos) => [...prevTodos,newTodo])
}

const deleteTodo = (idToBeDeleted) =>{
  setTodos((prevTodos => prevTodos.filter((todo)=>todo.id !== idToBeDeleted)))
}
  return (
    <>
      <TodoForm addTodo={addTodo}></TodoForm>
      <TodoRender todos={todos} deleteTodo={deleteTodo}  ></TodoRender>

    </>
  )
}

export default App
