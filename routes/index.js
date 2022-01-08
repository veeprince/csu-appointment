const express = require('express');
const Student = require('../models/student');
const router = express.Router();

router.get('/', async (req, res) => {
  let students;
  try {
    students = await Student.find()
      .sort({ studentClass: 'class' })
      .limit(10)
      .exec();
  } catch {
    students = [];
  }
  res.render('index', { students: students });
});

module.exports = router;
