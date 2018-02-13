import cheerio from 'cheerio';
import request from 'request';

import { Router } from 'express';

import { Article } from '../models';

const router = Router();

router.get("/articles", function (req, res) {
  Article.find((err, data) => {
    console.log(data);
    res.json(data);
  });
});

router.post("/articles", function (req, res) {
  Article.create({ title: req.body.title, body: req.body.body })
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.status(500).json(err);
  });
});

router.delete("/articles/:id", function (req, res) {
  Article.remove({ _id: req.params.id })
  .then(function(result) {
    res.json(result);
  })
  .catch(function(err) {
    res.status(500).json(err);
  });
});

router.post("/scrape", function (req, res) {
  request('https://news.ycombinator.com/', function(error, response, body) {
    const $ = cheerio.load(body);
    const stories = [];
    $(".storylink").each((storyId, story) => {
      const title = $(story).text();
      const link = $(story).attr("href");
      stories.push({ title: title, link: link });
    });
    res.json(stories);
  });
});

export default router;