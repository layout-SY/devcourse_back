const express = require('express');
const { join, login, passwordResetRequest, PasswordReset } = require('../controller/UserController');

const router = express.Router();

router.use(express.json());

router.post('/join', join);

router.post('/login', login);

router.put('/reset', PasswordReset);

module.exports = router;
