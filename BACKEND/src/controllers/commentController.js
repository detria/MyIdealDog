const Comment = require('../models/commentModel.js')
const comments = {}


comments.getComments = async (req, res) => {
    const comments = await Comment.find()
    res.json(comments)
}

comments.getCommentsByUser = async (req, res) => {
    const comments = await Comment.find({userId:res.user.userFound._id})
    console.log(comments)
    res.json(comments)
}

comments.createComment = async (req, res) => {
    const newComment = new Comment({topic:req.body.topic,comment:req.body.message,date:req.body.date,userId:res.user.userFound._id})
    Comment.create(newComment)
    res.json({ status: "Comentario creado con exito"})
  }

module.exports=comments;