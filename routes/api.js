import cheerio from 'cheerio';
import farmhash from 'farmhash';
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
    $(".storylink").each((storyId, story) => {
      const articleTitle = $(story).text();
      const articleLink = $(story).attr("href");
      const articleBody = "";
      const fingerprint = farmhash.hash32(articleTitle + articleLink);
      Article.findOne({ fingerprint: fingerprint }).then((result) => {
        if (!result) {
          Article.create({ title: articleTitle, link: articleLink, body: articleBody, fingerprint: fingerprint });
        }
      });
    });
    res.status(200).end();
  });
});

export default router;