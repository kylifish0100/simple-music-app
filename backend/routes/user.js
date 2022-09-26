const {check} = require('express-validator');
const userRouter = require('express').Router();
const user = require('../controllers/user');
const validarCampos =require('../middleware/validation');

/* Get All Users */
userRouter.get('/', user.getUsers);
/* Get a User by ID */
userRouter.get('/:id', user.getUserID);
/* Add a User */
userRouter.post('/signup', user.addUser);
userRouter.put('/:id', user.editUser); 
userRouter.delete('/delete/:id', user.deleteUser);

module.exports = userRouter

