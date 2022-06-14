const Comment = require('../models/commentModel.js')
const comments = {}

/**
 * 
 * @param {
 } req 
 * @param {*} res Busca en la base de datos todos los comentarios y tras obtenerlos los devuelve.
 */
comments.getComments = async (req, res) => {
    const comments = await Comment.find()
    res.json(comments)
}

/**
 * 
 * @param {*} req 
 * @param {*} res Busca en la base de datos los comentarios cuyo 'userId' coincida con el id del usuario logeado.
 */
comments.getCommentsByUser = async (req, res) => {
    const comments = await Comment.find({userId:res.user.userFound._id})
    res.json(comments)
}

/**
 * 
 * @param {*} req recibe los datos para poder crear un comentario
 * @param {*} res asigna los datos recibidos a las propiedades de la colección comments y posteriormente crea un nuevo comentario.
 */
comments.createComment = async (req, res) => {
    const newComment = new Comment({topic:req.body.topic,comment:req.body.comment,date:req.body.date,userId:res.user.userFound._id})
    Comment.create(newComment)
    res.json({ status: "Comentario creado con exito"})
  }

module.exports=comments;