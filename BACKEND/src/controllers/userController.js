const User = require('../models/userModel.js')
const users = {}
const jwt = require('jsonwebtoken');

users.getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

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

users.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
    res.json(user)
  } catch (error) {
    res.status(404).json({ message: "Usuario no encontrado" })
  }
}

users.loginUser = async (req, res) => {

  const JWT_Secret = 'your_secret_key';
  var bcrypt = require('bcryptjs');
  var emailReq = req.body.email;
  var password = req.body.password;
  try {
    const userFound = await User.findOne({ email: emailReq });
    if (userFound) {
      if (await bcrypt.compare(password, userFound.password)) {
        const token = jwt.sign({userFound}, JWT_Secret, {expiresIn: 604800});
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

users.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ status: "Usuario eliminado con exito" })
}
users.editUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body)
  res.json({ status: "Usuario modificado con exito" })
}

module.exports = users;