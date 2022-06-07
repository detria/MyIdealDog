const Dog = require('../models/dogModel.js')
const dogs = {}

//Lista los perros de la base de datos
dogs.getDogs = async (req, res) => {
    const dogs = await Dog.find()
    res.json(dogs)
}

dogs.getDogsByBreed = async (req, res) => {
    const breed = req.params.breed;
    const dogs = await Dog.find({breed:breed})
    res.json(dogs)
}

dogs.getDogsByActivity = async (req, res) => {
    const activity = req.params.activity;
    const dogs = await Dog.find({activity:activity})
    res.json(dogs)
}

dogs.getDogsByHealthcare = async (req, res) => {
    const care_requirement = req.params.care_requirement;
    const dogs = await Dog.find({care_requirement:care_requirement})
    res.json(dogs)
}

dogs.getDogsBySize = async (req, res) => {
    const size = req.params.size;
    const dogs = await Dog.find({size:size})
    res.json(dogs)
}

dogs.getDogsByWeight = async (req, res) => {
    const weight = req.params.weight;
    const dogs = await Dog.find({weight:weight})
    res.json(dogs)
}

dogs.createDog = async (req, res) => {
    const newDog = new Dog(req.body)
    Dog.create(newDog)
    res.json({ status: "Perro creado con exito" })
}

dogs.deleteDog = async (req, res) => {
    await Dog.findOneAndDelete({breed:req.params.breed})
    res.json({ status: "Perro eliminado con exito" })
}

dogs.editDog = async (req, res) => {
    await Dog.findOneAndUpdate({breed:req.params.breed}, req.body)
    res.json({ status: "Perro modificado con exito" })
}

module.exports = dogs;