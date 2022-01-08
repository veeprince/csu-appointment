const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// All Students Route
router.get('/', async (req, res) => {
  let query = Student.find();
  if (req.query.name != null && req.query.name != '') {
    query = query.regex('name', new RegExp(req.query.name, 'i'));
  }
  if (req.query.class != null && req.query.class != '') {
    query = query.regex('class', req.query.class);
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

// New Student Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Student());
  // console.log(student);
});

// Create Student Route
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    studentUrl: req.body.studentUrl,
    studentClass: req.body.studentClass,
  });

  try {
    const newStudent = await student.save();
    res.redirect(`students`);
  } catch {
    renderNewPage(res, student, true);
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
