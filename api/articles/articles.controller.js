const ArticleService = require('./articles.service');
const NotFoundError = require("../../errors/not-found");

class ArticlesController {
  async getAll(req, res, next) {
    try {
      const articles = await ArticleService.getAll();
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const article = await ArticleService.get(id);
      if (!article) {
        throw new NotFoundError();
      }
      res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const articleData = {
        ...req.body,
        user: req.user._id
      };

      const article = await ArticleService.create(articleData);
      
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {

      if (req.user.role !== 'admin') {
        throw new UnauthorizedError('Seuls les administrateurs peuvent effectuer cette action.');
      }

      const id = req.params.id;
      const data = req.body;
      const updatedArticle = await ArticleService.update(id, data);
      req.io.emit("article:update", updatedArticle);
      if (!updatedArticle) {
        throw new NotFoundError();
      }
      res.json(updatedArticle);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {

      if (req.user.role !== 'admin') {
        throw new UnauthorizedError('Seuls les administrateurs peuvent effectuer cette action.');
      }

      const id = req.params.id;
      await ArticleService.delete(id);
      req.io.emit("article:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
