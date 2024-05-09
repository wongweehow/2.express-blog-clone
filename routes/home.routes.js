const express = require('express');
const router = express.Router();
const Blogpost = require('../model/blogpost.model');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const count = await Blogpost.find().count();
      const blogs = await Blogpost.find().sort({ _id: -1 }).limit(2);
      res.render('index', { blogs, count });
    } catch (error) {
      console.log(error.message);
      res.json({ message: 'error on server' });
    }
  });

// Pagination variables:
const blogsPerPage = 2;

router
  .route('/page/:pageLoaded')
  .get(async (req, res) => {
    try {
      const moreBlogs = await Blogpost
                                .find()
                                .sort({ _id: -1 })
                                .limit(blogsPerPage)
                                .skip(parseInt(req.params.pageLoaded) * blogsPerPage)
      res.json({moreBlogs});
    } catch (error) {
      console.log(error.message);
      res.json({ message: 'error on server' });
    }
  })

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const blog = await Blogpost.findById(req.params.id);
      res.render('show-blog', { blog });
    } catch (error) {
      console.log(error.message);
      res.json({ message: 'error on server' });
    }
  });


module.exports = router;