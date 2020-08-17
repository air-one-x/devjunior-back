const express = require('express');
const devsCtrl = require('./routes/dev.controller');

//Router 
exports.router = (function() {
    let apiRouter = express.Router() ;

    //Route
    apiRouter.route('/dev/register/').post(devsCtrl.register);
    apiRouter.route('/dev/login/').post(devsCtrl.login);

    return apiRouter;

})();
 
