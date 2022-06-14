const User = require('../models/userModel.js')
const users = {}

/**
 * 
 * @param {*} req 
 * @param {*} res busca en la base de datos y obtiene todos los usuarios que encuentra y los devuelve
 */
users.getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

/**
 * 
 * @param {*} req recibe los datos necesarios para poder crear un nuevo usuario
 * @param {*} res asigna los datos a las propiedades del usuario y se crea un nuevo usuario, se devuelve un mensaje de éxito
 */
users.createUser = async (req, res) => {
  const bcrypt = require("bcryptjs");
  var rondas = 10;
  const newUser = new User(req.body)
  const palabraSecretaEncriptada = await bcrypt.hash(newUser.password, rondas);
  newUser.password = palabraSecretaEncriptada;
  newUser.role = "user";
  User.create(newUser)
  res.json({ status: "Usuario creado con exito" })
}

/**
 * 
 * @param {*} req se recibe por parámetro un email de un usuario
 * @param {*} res obtiene el usuario cuyo email coincida con el pasado por párametro y si todo va bien devuelve el usuario sino devolvera un mensaje de error
 */
users.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
    res.json(user)
  } catch (error) {
    res.status(404).json({ message: "Usuario no encontrado" })
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res obtiene el usuario cuyo id coincida con el id del usuario actual logeado y devuelve el usuario si lo encuentra, si no devolverá un error
 */
users.getUserById = async (req, res) => {
  try {
    const user = await User.findById(res.user.userFound._id)
    res.json(user)
  } catch (error) {
    res.status(404).json({ message: "Usuario no encontrado" })
  }
}

/**
 * 
 * @param {*} req se recibe el email y contraseña del usuario que esta intentando iniciar sesión
 * @param {*} res se busca el usuario en la BBDD cuyo email y contraseña coincidan con los pasados por por el req
 * @returns 
 */
users.loginUser = async (req, res) => {

  const JWT_Secret = 'your_secret_key';
  var bcrypt = require('bcryptjs');
  var emailReq = req.body.email;
  var password = req.body.password;
  try {
    const userFound = await User.findOne({ email: emailReq });
    if (userFound) {
      if (await bcrypt.compare(password, userFound.password)) {
        const token = jwt.sign({ userFound }, JWT_Secret, { expiresIn: 604800 });
        return res.status(200).send({
          user: userFound,
          token: token
        });

      } else {
        return res.status(500).json({ message: 'Password incorrect' });
      }
    } else {

      return res.status(500).json({ message: 'The user doesn´t exist' });
    }

  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: 'There was a problem logging a user' });
  }

};

/**
 * 
 * @param {*} req se recibe un id de usuario por parámetro
 * @param {*} res se busca el usuario cuyo id sea el mismo que el pasado por parámetro y lo elimina, devuelve un mensaje de éxito
 */
users.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ status: "Usuario eliminado con exito" })
}

/**
 * 
 * @param {*} req se recibe un email de usuario por parámetro
 * @param {*} res se busca el usuario cuyo email sea el mismo que el pasado por parámetro y lo elimina, devuelve un mensaje de éxito
 */
users.deleteUserEmail = async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email })
  res.json({ status: "Usuario eliminado con exito" })
}

/**
 * 
 * @param {*} req recibe los datos del usuario 
 * @param {*} res se busca el usuario cuyo id sea el mismo que del usuario actualmente logeado y se asigna a las propiedades de este los nuevos datos actualizados
 */
users.editUser = async (req, res) => {
  const bcrypt = require("bcryptjs");
  var rondas = 10;
  console.log(req.body.password)
  if (typeof (req.body.password) != 'undefined') {
    const contraseñaEncriptada = await bcrypt.hash(req.body.password, rondas);
    req.body.password = contraseñaEncriptada
    console.log(req.body.password )
    const userFound = await User.findOneAndUpdate({ _id: res.user.userFound._id },{name:req.body.name,lastname:req.body.lastname,email:req.body.email,password:req.body.password})

  }else{
    const userFound = await User.findOneAndUpdate({ _id: res.user.userFound._id },{name:req.body.name,lastname:req.body.lastname,email:req.body.email})

  }
  

  res.json({ status: "Usuario modificado con exito" })
}

module.exports = users;