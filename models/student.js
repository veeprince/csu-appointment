const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentUrl: {
    type: String,
    required: true,
  },
  studentClass: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);
