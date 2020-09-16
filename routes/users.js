//IMPORT
const express = require('express');
const userCtrl = require('../controllers/users');
const middlewareAuth = require('../middleware/auth');

//ROUTER
const router = express.Router();


// @ROUTES POST users/register
// ADD NEW USER IN DB
router.post('/register',middlewareAuth, userCtrl.addNewUser);



// @ROUTES GET users/usersList
// GET LIST OF ALL USERS
router.get('/usersList', userCtrl.findAllUsers);



// @ROUTES DELETE users/delete/:id
// DELETE USER:ID
router.delete('/delete/:id',middlewareAuth, userCtrl.deleteUser);



// @ROUTES UPDATE users/update/:id
// UPDATE USER:ID
router.patch('/update/:id', middlewareAuth, userCtrl.updateUser);



// @ROUTES FINDONE users/find/:id
// FINDONE USER:ID
router.get('/find/:id', userCtrl.findOneUser);



// @ROUTES CONNECTION 
router.post('/login', userCtrl.login);



//EXPORTS
module.exports = router;
