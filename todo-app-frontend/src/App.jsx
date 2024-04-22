import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


function App() {

  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
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

  const handleTitleChange = (event)=>{
   setTitle(event.target.value)
  }

  const handleDescriptionChange=(event)=>{
    setDescription(event.target.value)
  }

  const onSubmit = ()=>{
    axios.post('http://localhost:3000/todos',{
      title:title,
      description:description
    }).then((response)=>{
      console.log(response.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const onDelete = (idToBeDeleted)=>{
    console.log('Inside onDelete. idToBeDeleted='+idToBeDeleted)
    axios.delete('http://localhost:3000/todos/'+idToBeDeleted)
    .then((response)=>{
      console.log(response.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
      Title:
      <input type="text" value={title} onChange={handleTitleChange} />
      &nbsp;
      Description:
      <input type="text" value={description} onChange={handleDescriptionChange}  />
      &nbsp;
      <input type="button" value="Submit" onClick={onSubmit} />
      <br /><br />
      
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

export default App
