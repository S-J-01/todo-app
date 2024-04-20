const express = require('express');
const fs = require('fs');
const cors = require('cors');  
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());



  
  app.get('/todos',(req,res)=>{
    fs.readFile('./todos.json','utf-8',(err,data)=>{
        if (err) throw err;
        var todosArray = JSON.parse(data);
        console.log(`read data from file for get/todos`);
        res.status(200).json(todosArray);
    })
  })
    
  
  app.get('/todos/:id',(req,res)=>{
    var id = parseInt(req.params.id);
    fs.readFile('./todos.json','utf-8',(err,data)=>{
    if (err) throw err;
    var todosArray = JSON.parse(data);
    console.log(`read data from file for get todos/:id`);
    var requiredTodo = todosArray.find((obj) => obj.id === id);
    if(requiredTodo){
      res.status(200).json(requiredTodo);
    }else{
      res.status(404).send('element not found');
    }
    })
  })
  
  
  app.post('/todos',(req,res)=>{
    var newTodo ={
      title:req.body.title,
      description:req.body.description,
      id:Math.floor(Math.random() * 100) + 1
    }
    fs.readFile('./todos.json','utf-8',(err,data)=>{
      if (err) throw err;
      
      var todosArray = JSON.parse(data);
      console.log(`read data from file for post /todos`);
      todosArray.push(newTodo);
    fs.writeFile('./todos.json',JSON.stringify(todosArray),(err)=>{
      if (err) throw err;
      console.log(`wrote data to file for post /todos`);
      res.status(201).json(newTodo);
    })
  })
})
    
    
  
app.put('/todos/:id',(req,res)=>{
  var id = parseInt(req.params.id);
  fs.readFile('./todos.json','utf-8',(err,data)=>{
      if (err) throw err;
      var todosArray = JSON.parse(data);
      console.log(`read data from file for put /todos/:id`);
      var requiredTodoindex = todosArray.findIndex((obj) => obj.id === id);
  if(requiredTodoindex!== -1){
  todosArray[requiredTodoindex].title=req.body.title;
  todosArray[requiredTodoindex].description = req.body.description;
  fs.writeFile('./todos.json',JSON.stringify(todosArray),(err)=>{
      if (err) throw err;
      console.log(`wrote data to file for put todos/:id`);
      res.status(200).send('item was found and updated');
    })
  }else{
    res.status(404).send('item not found');
  }
})
})
  

app.delete('/todos/:id',(req,res)=>{
 var id = parseInt(req.params.id);
 fs.readFile('./todos.json','utf-8',(err,data)=>{
     if (err) throw err;
     var todosArray = JSON.parse(data);
     console.log(`read data from file for delete /todos/:id`);
     var indexToDelete = todosArray.findIndex((obj) => obj.id === id);
 if(indexToDelete!== -1){
   todosArray.splice(indexToDelete,1);
   fs.writeFile('./todos.json',JSON.stringify(todosArray),(err)=>{
     if (err) throw err;
     console.log(`wrote data to file for delete /todos/:id`);
     res.status(200).json({id:id});
   })
  }else{
    res.status(404).send('item not found');
  }
})
})
   

app.use((req,res,next)=>{
  res.status(404).send('This is an undefined route');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
    

