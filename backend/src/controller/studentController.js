const connection = require('../database/connection');
const { dbSql, dbScript } = require('../utils/db_script')

module.exports.create = async (req, res) => {
    try {
        const { name, photo } = req.body;
        let s0 = dbScript(dbSql['Q7'], {
            var1: name,
            var2: photo,
        })
        let createStudent = await connection.query(s0);
        return res.status(201).json({
            message: 'Student created successfully',
            data: createStudent.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.getAllStudent = async (req, res) => {
    try {
        let s0 = dbScript(dbSql['Q8'])
        let getStudent = await connection.query(s0);
        return res.status(200).json({
            message: 'Student Fetched successfully',
            data: getStudent.rows
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.assignClassToStudent = async (req, res) => {
    try {
        const { student_id, class_id } = req.body;
        let s0 = dbScript(dbSql['Q9'], {
            var1: class_id,
            var2: student_id,
        })
        let assignClass = await connection.query(s0);
        return res.status(200).json({
            message: 'Class assigned successfully',
            data: assignClass.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.studentInEveryClass = async (req, res) => {
    try {
        let s0 = dbScript(dbSql['Q10'])
        let getStudent = await connection.query(s0);
        return res.status(200).json({
            message: 'Student Fetched successfully',
            data: getStudent.rows
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.classMates = async (req, res) => {
    try {
        const studentId = req.params.studentId
        let s0 = dbScript(dbSql['Q11'], { var1: studentId })
        let getStudent = await connection.query(s0);
        return res.status(200).json({
            message: 'Classmate Fetched successfully',
            data: getStudent.rows
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

