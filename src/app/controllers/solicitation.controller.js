const express = require('express');
// const authMiddleware = require('../middlewares/auth.middleware');

const Solicitation = require('../models/Solicitation');

const router = express.Router();

// router.use(authMiddleware);

// criar
router.post('/create', async (req, res) => {
    try {
        const solicitation = await Solicitation.create({ ...req.body, user: req.userId });
        return res.send({ solicitation });

    } catch (err) {
        return res.status(400).send({ error: 'Error creating new solicitation' });
    }
});

// todos
router.get('/list', async (req, res) => {
    try {
        const solicitations = await Solicitation.find().populate('user');
        return res.send(solicitations);
    } catch (err) {
        return res.status(400).send({ error: 'Error listing solicitations' });
    }
});

// um
router.get('/one/:solicitationId', async (req, res) => {
    try {
        const solicitation = await Solicitation.findById(req.params.solicitationId).populate('user');
        return res.send({ solicitation });
    } catch (err) {
        return res.status(400).send({ error: 'Error listing solicitation' });
    }
});

// editar
router.put('/update/:solicitationId', async (req, res) => {});

// excluir
router.delete('/delete/:solicitationId', async (req, res) => {});

module.exports = (app) => app.use('/solicitations', router);