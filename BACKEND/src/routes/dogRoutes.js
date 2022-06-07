const{Router} =require('express')
const router=Router()
const dogsController=require('../controllers/dogController.js')
const  validate  = require('../middleware/validation.js');

router.get('/list', dogsController.getDogs);
router.get('/list/getByBreed/:breed', dogsController.getDogsByBreed);
router.get('/list/getByActivity/:activity', dogsController.getDogsByActivity);
router.get('/list/getByWeight/:weight', dogsController.getDogsByWeight);
router.get('/list/getBySize/:size', dogsController.getDogsBySize);
router.get('/list/getByHealthCare/:care_requirement', dogsController.getDogsByHealthcare);
router.post('/',validate.validateAdmin,dogsController.createDog)
router.put('/:breed',validate.validateAdmin,dogsController.editDog)
router.delete('/:breed',validate.validateAdmin,dogsController.deleteDog)


module.exports=router