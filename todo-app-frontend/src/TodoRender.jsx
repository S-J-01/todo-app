import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'

function TodoRender (){

const [todos,setTodos]=useState([])

useEffect(()=>{
    setInterval(()=>{
      axios.get('http://localhost:3000/todos')
      .then((response)=>{
        console.log(response.data)
        setTodos(response.data)
      }).catch((err)=>{
        console.log(err)
      })
    },500)
},[])

const onDelete = (idToBeDeleted)=>{
    console.log('Inside onDelete. idToBeDeleted='+idToBeDeleted)
    axios.delete('http://localhost:3000/todos/'+idToBeDeleted)
    .then((response)=>{
      console.log(response.data)
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
          <button type='button'  onClick={()=>onDelete(todoObj.id)}>Delete</button>
          </div>

        )
      })}
      
    </>
  )

}

export default TodoRender