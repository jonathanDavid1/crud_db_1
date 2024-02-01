const express = require('express');
const routerCourse = require('./course.router');
const routerStudent = require('./student.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/students', routerStudent)
router.use('/courses', routerCourse)

module.exports = router;