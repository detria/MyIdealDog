const{Router} =require('express')
const router=Router()
const usersController=require('../controllers/userController.js')

router.get('/list', usersController.getUsers);
router.get('/:email', usersController.getUserByEmail);
router.post('/', usersController.createUser)
router.post('/login', usersController.loginUser)
router.put('/:id',usersController.editUser)
router.delete('/:id',usersController.deleteUser)


module.exports=router