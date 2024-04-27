const mongoose = require('mongoose');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom')

const dompurify = createDomPurify(new JSDOM().window);

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  markdown: {
    type: String,
    required: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: new Date(),
    required: true
  }
})

schema.pre('validate', function(next) {
  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
  }
  next();
});

module.exports = mongoose.model('Blogpost', schema);