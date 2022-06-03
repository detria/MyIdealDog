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

module.exports=comments;