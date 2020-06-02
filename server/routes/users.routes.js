const express = require('express');
const router = express.Router();

const UserControllers = require('../controllers/users.controllers');

router.post('/login', UserControllers.login);
router.post('/register', UserControllers.register);
router.get('/', UserControllers.getUsers);
router.get('/:id', UserControllers.getUserById);
router.delete('/:id', UserControllers.deleteUser);

module.exports = router;