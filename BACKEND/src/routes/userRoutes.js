const{Router} =require('express')
const router=Router()
const usersController=require('../controllers/userController.js');
const  validate  = require('../middleware/validation.js');

router.get('/userById',validate.validateToken,usersController.getUserById);
router.get('/list',validate.validateToken, usersController.getUsers);
router.get('/:email', usersController.getUserByEmail);
router.post('/', usersController.createUser)
router.post('/login', usersController.loginUser)
router.put('/',validate.validateToken,usersController.editUser)
router.delete('/:id',usersController.deleteUser)
router.delete('/delete/:email',usersController.deleteUserEmail)


module.exports=router