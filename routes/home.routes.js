const express = require('express');
const router = express.Router();
const Blogpost = require('../model/blogpost.model');

router
  .route('/')
  .get(async (req, res) => {
    const count = await Blogpost.find().count();
    const blogs = await Blogpost.find().sort({ _id: -1 }).limit(2);
    res.render('index', { blogs, count });
  });

// Pagination variables:
const pagination = 2;

router
  .route('/page/:page')
  .get(async (req, res) => {
    const moreBlogs = await Blogpost.find().sort({ _id: -1 }).limit(pagination).skip(parseInt(req.params.page) * pagination)
    res.json({moreBlogs});
  })

module.exports = router;