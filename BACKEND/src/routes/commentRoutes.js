const{Router} =require('express')
const router=Router()
const commentControler=require('../controllers/commentController.js')
const  validateToken  = require('../middleware/validation.js');

router.get('/list',validateToken, commentControler.getComments);
router.get('/listByUser',validateToken, commentControler.getCommentsByUser);

module.exports=router