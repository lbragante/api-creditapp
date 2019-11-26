const express = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const User = require('../models/User');
const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400 // 86400 seconds = 1 day
    });
}

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        user.save(req.body);
        
        return res.send({ user, token: generateToken({ id: user.id }) });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne(email).select('+password');

    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    if (!await bycrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    res.send({ user, token: generateToken({ id: user.id }) });

});

module.exports = (app) => app.use('/auth', router);