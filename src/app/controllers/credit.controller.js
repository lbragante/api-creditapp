const express = require('express');
// const authMiddleware = require('../middlewares/auth.middleware');

const Credit = require('../models/Credit');

const router = express.Router();

// router.use(authMiddleware);

// criar
router.post('/create', async (req, res) => {
    try {
        const credit = await Credit.create(req.body);
        return res.send(credit);
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new credit' });
    }
});

// todos
router.get('/list', async (req, res) => {
    try {
        const credits = await Credit.find({
            active: true
        });
        return res.send(credits);
    } catch (err) {
        return res.status(400).send({ error: 'Error listing credits' });
    }
});

// um
router.get('/one/:creditId', async (req, res) => {
    try {
        const credit = await Credit.findById(req.params.creditId);
        return res.send(credit);
    } catch (err) {
        return res.status(400).send({ error: 'Error listing credit' });
    }
});

// editar
router.put('/update/:creditId', async (req, res) => {});

// excluir
router.delete('/delete/:creditId', async (req, res) => {});

module.exports = (app) => app.use('/credits', router);