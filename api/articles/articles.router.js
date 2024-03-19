const express = require('express');
const router = express.Router();
const ArticlesController = require('./articles.controller');
const authMiddleware = require("../../middlewares/auth");

router.get('/', ArticlesController.getAll);
router.get('/:id', ArticlesController.getById);
router.post('/', authMiddleware, ArticlesController.create);
router.put('/:id', authMiddleware ,ArticlesController.update);
router.delete('/:id', authMiddleware ,ArticlesController.delete);

module.exports = router;
