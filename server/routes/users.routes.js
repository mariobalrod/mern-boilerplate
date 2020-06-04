const express = require('express');
const router = express.Router();

const { auth } = require("../middlewares/auth");

const UserControllers = require('../controllers/users.controllers');

router.get("/auth", auth, UserControllers.authentication);
router.post('/login', UserControllers.login);
router.post('/register', UserControllers.register);
router.post('/logout', auth, UserControllers.logout);
router.get('/', UserControllers.getUsers);
router.get('/:id', UserControllers.getUserById);
router.delete('/:id', UserControllers.deleteUser);

module.exports = router;