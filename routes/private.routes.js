const express = require('express');
const Blogspot = require('../model/blogpost.model');
const router = express.Router();


router
  .route('/')
  .post(async (req, res) => {
    try {
      await Blogspot.create({
        title: req.body.title,
        markdown: req.body.markdown
      });
      res.json({ message: 'blogpost created' });
    } catch (error) {
      res.json({ message: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const blogs = await Blogspot.find();
      res.json(blogs);
    } catch (error) {
      res.json({ message: error.message })
    }
  })

router
  .route('/:id')
  .delete(async (req, res) => {
    try {
      await Blogspot.findByIdAndDelete(req.params.id);
      res.json({ message: 'blogspot deleted' });
    } catch (error) {
      res.send({ message: error.message });
    }
  })

router
  .route('/editor')
  .get((req, res) => {
    res.render('private');
  })

module.exports = router;