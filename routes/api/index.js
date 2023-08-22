const router = require('express').Router();
const userRoutes = require('../../routes/api/users'); 
const thoughtRoutes = require('../../routes/api/thought'); 

router.use('/users', userRoutes); 
router.use('/thoughts', thoughtRoutes); 

module.exports = router; 
