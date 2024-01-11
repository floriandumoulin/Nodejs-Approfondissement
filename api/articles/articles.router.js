const express = require('express');
const router = express.Router();
const ArticlesController = require('./articles.controller');

router.get('/', ArticlesController.getAll);
router.get('/:id', ArticlesController.getById);
router.post('/', ArticlesController.create);
router.put('/:id', ArticlesController.update);
router.delete('/:id', ArticlesController.delete);

module.exports = router;
