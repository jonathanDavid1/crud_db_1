const catchError = require('../utils/catchError');
const Course = require('../models/Course');
const Student = require('../models/Student');

const getAll = catchError(async (req, res) => {
  const results = await Course.findAll({ include: Student });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Course.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Course.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setStudents = catchError(async (req, res) => {
  //buscamos el curso
  const { id } = req.params
  const course = await Course.findByPk(id)

  //en caso que no se encuentre el curso, retorno 404
  if (!course) return res.sendStatus(404)

  //seteo los estudaintes a los cursos
  await course.setStudents(req.body)

  //leo los estudiantes que setee
  const students = await course.getStudents()

  //retorno los estudiantes que setee en los cursos
  return res.json(students)
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setStudents
}