const  Router = require('express');
const { getUsers, getUserById, saveUser }= require('../controllers/usersController');

const router = Router();

router.get('/', getUsers);
router.post('/', saveUser);
router.get('/:uid', getUserById);

module.exports= router;




