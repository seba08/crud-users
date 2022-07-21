const { Router } = require('express')

const router = Router();

const User = require('../models/users')
router.get('/', async(req, res)=>{

    const user = await User.find({});
    res.json(user)
})

router.post('/', async(req, res) => {

    const {nombre, apellidos, edad, email, estado } = req.body;
    const newUser = await User.insertMany({nombre, apellidos, edad, email, estado})

    res.send("Usuario creado correctamente...!")
    console.log(newUser)
})

router.put('/:_id', async(req, res)=>{
    const { _id } = req.params;
    const {nombre, apellidos, edad, email, estado} = req.body;
    const userUpdated = await User.findByIdAndUpdate({_id}, {nombre, apellidos, edad, email, estado})
    res.send("Usuario actualizado correctamente...!")
    console.log("Este es el _id para put:", userUpdated)
})

router.delete('/:_id', async(req, res) =>{
    const { _id } = await req.params;
    //const { nombre, apellidos, edad, email, estado } = req.body;
    const userDeleted = await User.findByIdAndDelete(_id)
    res.send("Usuario Eliminado...!")
    console.log("id: ", _id)

})
module.exports = router;