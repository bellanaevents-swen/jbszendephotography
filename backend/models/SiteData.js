import mongoose from 'mongoose';

const siteDataSchema = new mongoose.Schema({
  albums: { type: Array, default: [] },
  photos: { type: Array, default: [] },
  tags: { type: Array, default: [] },
  descriptions: { type: Object, default: {} },
  sectionBackgrounds: { type: Object, default: {} },
  testimonials: { type: Array, default: [] },
  settings: { type: Object, default: {} }
}, { timestamps: true });

export default mongoose.model('SiteData', siteDataSchema);