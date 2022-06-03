const{Router} =require('express')
const router=Router()
const dogsController=require('../controllers/dogController.js')

router.get('/list', dogsController.getDogs);
router.get('/list/getByBreed/:breed', dogsController.getDogsByBreed);
router.get('/list/getByActivity/:activity', dogsController.getDogsByActivity);
router.get('/list/getByWeight/:weight', dogsController.getDogsByWeight);
router.get('/list/getBySize/:size', dogsController.getDogsBySize);
router.get('/list/getByHealthCare/:care_requirement', dogsController.getDogsByHealthcare);
router.post('/', dogsController.createDog)
router.put('/:id',dogsController.editDog)
router.delete('/:id',dogsController.deleteDog)


module.exports=router