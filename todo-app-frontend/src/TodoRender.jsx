import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'

function TodoRender (props){
const todos = props.todos
const deleteTodo = props.deleteTodo

const onDelete = (idToBeDeleted)=>{
    console.log('Inside onDelete. idToBeDeleted='+idToBeDeleted)
    axios.delete('http://localhost:3000/todos/'+idToBeDeleted)
    .then((response)=>{
      console.log(response.data)
      deleteTodo(response.data.id)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return(
    <>
      {todos.map((todoObj)=>{
        return(
          <div>
          Title:
          {todoObj.title}
          &nbsp;
          Description:
          {todoObj.description}
          &nbsp;
          Id:
          {todoObj.id}
          &nbsp;
          <button type='button'  onClick={()=>onDelete(todoObj.id)}>Delete</button>
          </div>

        )
      })}
      
    </>
  )

}

export default TodoRender