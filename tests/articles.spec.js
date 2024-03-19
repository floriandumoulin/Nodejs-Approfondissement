const supertest = require('supertest');
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const { app } = require("../server");
const Article = require('../api/articles/articles.schema');
const jwt = require("jsonwebtoken");
const config = require("../config");

function generateTestToken() {
  const testUser = {
    _id: "userId",
    name: "Test User",
    role: "admin"
  };

  return jwt.sign(testUser, config.secretJwtToken);
}

describe('Articles API', () => {

  test('should create a new article', async () => {
    const mockArticle = { title: 'Test Article', content: 'Test content' };
    mockingoose(Article).toReturn(mockArticle, 'save');

    const response = await supertest(app)
      .post('/api/articles')
      .send(mockArticle);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(mockArticle.title);
    expect(response.body.content).toBe(mockArticle.content);
  });

  test('should update an article', async () => {
    const mockArticle = { title: 'Updated Article', content: 'Updated content' };
    const articleId = 'some-article-id';
    mockingoose(Article).toReturn(mockArticle, 'findOneAndUpdate');

    const testToken = generateTestToken();

    const response = await supertest(app)
      .put(`/api/articles/${articleId}`)
      .set('x-access-token', testToken)
      .send(mockArticle);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(mockArticle.title);
    expect(response.body.content).toBe(mockArticle.content);
  });

  test('should delete an article', async () => {
    const articleId = 'some-article-id';
    mockingoose(Article).toReturn(null, 'findOneAndDelete');

    const testToken = generateTestToken();

    const response = await supertest(app)
      .delete(`/api/articles/${articleId}`)
      .set('x-access-token', testToken)
      .send();

    expect(response.statusCode).toBe(204);
  });
});
