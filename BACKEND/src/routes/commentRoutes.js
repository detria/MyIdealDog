const{Router} =require('express')
const router=Router()
const commentControler=require('../controllers/commentController.js')
const  validate  = require('../middleware/validation.js');

router.get('/list',validate.validateToken, commentControler.getComments);
router.get('/listByUser',validate.validateToken, commentControler.getCommentsByUser);
router.post('/',validate.validateToken, commentControler.createComment);

module.exports=router