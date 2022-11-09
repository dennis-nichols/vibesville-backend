'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

//we chose to make status into available to spice it up with a boolean in our schema
const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  redirect_url: { type: String, required: false },
  city: { type: String, required: true },
  city_score: { type: Number, required:true },
  state: { type: String, required: true },
  latitude: { type: String, required: false },
  longitude: { type: String, required: false },
  user_id: { type: String, required: true },
  user_score: { type: Number, required: false },
  housing_score: { type: Number, required: false},
  COL_score: { type: Number, required: false},
  health_score: {type: Number, required: false},
  nature_score: { type: Number, required: false},
  culture_score: { type: Number, required: false}
});

module.exports = mongoose.model('Job', jobSchema);
