const Comment = require('../models/commentModel.js')
const comments = {}


comments.getComments = async (req, res) => {
    const comments = await Comment.find()
    res.json(comments)
}

module.exports=comments;