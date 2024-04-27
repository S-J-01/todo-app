import { useState } from 'react'
import axios from 'axios'

function TodoForm (){

    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")

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

    return(
    <div>
      Title:
      <input type="text" value={title} onChange={handleTitleChange} />
      &nbsp;
      Description:
      <input type="text" value={description} onChange={handleDescriptionChange}  />
      &nbsp;
      <input type="button" value="Submit" onClick={onSubmit} />
      <br /><br />
    </div>
    )


}

export default TodoForm