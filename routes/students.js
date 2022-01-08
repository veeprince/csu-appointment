const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// All Students Route
router.get('/', async (req, res) => {
  let query = Student.find();
  if (req.query.name != null && req.query.name != '') {
    query = query.regex('name', new RegExp(req.query.name, 'i'));
  }
  if (req.query.studentClass != null && req.query.studentClass != '') {
    query = query.regex('studentClass', req.query.studentClass);
  }

  try {
    const students = await query.exec();
    res.render('students/index', {
      students: students,
      searchOptions: req.query,
    });
  } catch {
    res.redirect('/');
  }
});

async function renderNewPage(res, student, hasError = false) {
  try {
    const params = {
      student: student,
    };
    if (hasError) {
      params.errorMessage = 'Error Creating Student';
    }

    res.render('students/new', params);
  } catch {
    res.redirect('/students');
  }
}
module.exports = router;
