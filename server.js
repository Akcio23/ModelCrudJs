const express = require('express');
const app = express()
const port = 3001;

const users = [{ 
    name: "Pedro",
    age: 22,
    id: 1
},{
    name: "Marina",
    age: 21,
    id: 2
}]



//Creating method to return all data register 

app.get('/', (req, res) => {
    console.log('Requisiçao feita!') 
    res.send("LISTA DE USUARIOS :  " +  JSON.stringify(users))
        
        
    
  }
)



// Creating method to return all data from a user

app.get('/:id',(req,res)=>{
    const {id} = req.params
    let userFound = false 
    users.forEach((userData)=>{
        if(id == userData.id){
            userFound = true
            res.status(200).send(userData)
        }
    })

    if(userFound == false){
        res.status(401).send("Usuario não encontrado")
    }
 })


//Creating method to add new user 

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

// Creating method to alteration data user 

app.put('/id/:id',(req,res)=>{
    const{id} = req.params 
    let{name, age} = req.body
    let userFound = false 

    users.forEach((objUser)=>{
        if(objUser.id == id){
            objUser.name = name,
            objUser.age = age
            userFound = true 
        }
    })
    if(userFound == !true){
        res.status(400).send('Usuario não econtrado!')
    }
    if(userFound == true){
        res.status(200).send("Alteração realizada com sucesso!")
    }
 
   
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });