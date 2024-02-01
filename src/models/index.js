const Course = require('./Course')
const Student = require('./Student')

//table pivot -> courseStudent
Course.belongsToMany(Student, { through: 'courseStudent' })
Student.belongsToMany(Course, { through: 'courseStudent' })