const mongoose = require('mongoose');

const siteDataSchema = new mongoose.Schema({
  albums: Array,
  photos: Array,
  tags: Array,
  descriptions: Object,
  sectionBackgrounds: Object,
  testimonials: Array,
  settings: Object
}, { timestamps: true });

module.exports = mongoose.model('SiteData', siteDataSchema);