const Dog = require('../models/dogModel.js')
const dogs = {}

/**
 * 
 * @param {*} req 
 * @param {*} res busca en la base de datos todos los perros y tras obtenerlos los devuelve
 */
dogs.getDogs = async (req, res) => {
    const dogs = await Dog.find()
    res.json(dogs)
}

/**
 *
 * @param {*} req se recibe como parametro una raza de perro
 * @param {*} res devuelve el perro cuya raza coincida con la pasada por parámetro
 */
dogs.getDogsByBreed = async (req, res) => {
    const breed = req.params.breed;
    const dogs = await Dog.find({ breed: breed })
    res.json(dogs)
}

/**
 * 
 * @param {*} req se recibe como parámetro la actividad
 * @param {*} res devuelve los perros cuya actividad coincida con la pasada por parámetro
 */
dogs.getDogsByActivity = async (req, res) => {
    const activity = req.params.activity;
    const dogs = await Dog.find({ activity: activity })
    res.json(dogs)
}

/**
 * 
 * @param {*} req se recibe como parámetro el requerimiento de cuidados
 * @param {*} res devuelve los perros cuyo requerimiento de cuidados coincida con el pasado por parámetro
 */
dogs.getDogsByHealthcare = async (req, res) => {
    const care_requirement = req.params.care_requirement;
    const dogs = await Dog.find({ care_requirement: care_requirement })
    res.json(dogs)
}

/**
 * 
 * @param {*} req se recibe como parámetro el tamaño
 * @param {*} res devuelve los perros cuyo tamaño coincida con el pasado por parámetro
 */
dogs.getDogsBySize = async (req, res) => {
    const size = req.params.size;
    const dogs = await Dog.find({ size: size })
    res.json(dogs)
}

/**
 * 
 * @param {*} req se recibe como parámetro el peso
 * @param {*} res devuelve los perros cuyo peso coincida con el pasado por parámetro
 */
dogs.getDogsByWeight = async (req, res) => {
    const weight = req.params.weight;
    const dogs = await Dog.find({ weight: weight })
    res.json(dogs)
}

/**
 * 
 * @param {*} req se reciben los datos necesarios para poder crear un nuevo perro
 * @param {*} res se asigna a las propiedades de un perro los datos recibidos y se crea un perro, se devuelve un mensaje si 
 * se ha creado con éxito
 */
dogs.createDog = async (req, res) => {
    const newDog = new Dog(req.body)
    Dog.create(newDog)
    res.json({ status: "Perro creado con exito" })
}

/**
 * 
 * @param {*} req recibe una raza por parámetro
 * @param {*} res elimina el perro de la base de datos cuya raza coincida con la pasada por parámetro y devuelve un mensaje de confirmación
 */
dogs.deleteDog = async (req, res) => {
    await Dog.findOneAndDelete({ breed: req.params.breed })
    res.json({ status: "Perro eliminado con exito" })
}

/**
 * 
 * @param {*} req recibe los mismos o nuevos datos de un perro, y recibe por parámetro la raza para saber que perro tendrá que editar
 * @param {*} res busca un perro cuya raza coincida con la del parámetro y edita las propiedades cuyos datos hayan cambiado de ese mismo perro.
 * Devuelve un mensaje de confirmación
 */
dogs.editDog = async (req, res) => {
    await Dog.findOneAndUpdate({ breed: req.params.breed }, req.body)
    res.json({ status: "Perro modificado con exito" })
}

module.exports = dogs;