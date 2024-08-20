const express = require('express');
const app = express()
const port = 3001;
app.use(express.json())

const users = [{ 
    name: "Pedro",
    age: 22,
    id: 1
},{
    name: "Marina",
    age: 21,
    id: 2
}]

app.get('/', (req, res) => {
    res.send("LISTA DE USUARIOS :  " + users.map((i)=>{
        console.log('Requisiçao feita!') 
        return i.name
    }))
  }
)

app.get('/:index',(req,res)=>{
    const {index} = req.params
    const mensage = "Usuario encontrado : "
    if(index >= 0 && index <= users.length){
        res.send( mensage+JSON.stringify(users[index]))
    }else(
        res.send('Usuario não encontrado!')
    )})

app.post('/:addUser',(req,res)=>{
    const {name,age} = req.body
   if(!name || !age){
    return res.status(400).send("Nome e idade são necessários.");
   } 
   
   const newuser = {
        name,
        age,
        id: users.length+1,
   }

   users.push(newuser)

   res.status(201).send("Usuario criado com sucesso!")
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });