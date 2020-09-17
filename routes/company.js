// IMPORT 
const express = require('express');
const companyCtrl = require('../controllers/company');
const middlewareCompany = require('../middleware/auth');

//INIT ROUTER
const router = express.Router();

// @ROUTE GET company/all
// FIND ALL COMPANY
router.get('/all', companyCtrl.findAllUsers);

// @ROUTE GET company/find/:id
// FIND ONE USER:id
router.get('/find/:id', companyCtrl.findOneUser);

// @ROUTE POST company/register
// ADD NEW USER
router.post('/register', companyCtrl.addUser);

// @ROUTE PATCH company/update/:id
// UPDATE SOME USER
router.patch('/update/:id', middlewareCompany, companyCtrl.updateUser);

// @ROUTE DELETE company/delete/:id
// DELETE SOME USER
router.delete('/delete/:id',middlewareCompany, companyCtrl.deleteUser);

module.exports = router ;
