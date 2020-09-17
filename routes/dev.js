//IMPORT
const express = require('express');
const devCtrl = require('../controllers/dev');
const middlewareAuth = require('../middleware/auth');

//ROUTER
const router = express.Router();


// @ROUTES POST users/register
// ADD NEW USER IN DB
router.post('/register', devCtrl.addNewUser);



// @ROUTES GET users/usersList
// GET LIST OF ALL USERS
router.get('/usersList', devCtrl.findAllUsers);



// @ROUTES DELETE users/delete/:id
// DELETE USER:ID
router.delete('/delete/:id',middlewareAuth, devCtrl.deleteUser);



// @ROUTES UPDATE users/update/:id
// UPDATE USER:ID
router.patch('/update/:id', devCtrl.updateUser);



// @ROUTES FINDONE users/find/:id
// FINDONE USER:ID
router.get('/find/:id', devCtrl.findOneUser);



// @ROUTES CONNECTION 
router.post('/login', devCtrl.login);



//EXPORTS
module.exports = router;
