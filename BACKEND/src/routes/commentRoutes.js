const{Router} =require('express')
const router=Router()
const commentControler=require('../controllers/commentController.js')

router.get('/list', commentControler.getComments);


module.exports=router