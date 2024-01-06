const connection = require('../database/connection');
const { dbSql, dbScript } = require('../utils/db_script');

module.exports.create = async (req, res) => {
    try {
        const { name, school_id } = req.body;
        let s0 = dbScript(dbSql['Q5'], {
            var1: name,
            var2: school_id
        })
        let createClass = await connection.query(s0);
        return res.status(201).json({
            message: 'Class created successfully',
            data: createClass.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.getClass = async (req, res) => {
    try {
        const schoolId = req.params.schoolId;
        let s0 = dbScript(dbSql['Q6'], {
            var1: schoolId
        })
        let getSchool = await connection.query(s0);
        return res.status(200).json({
            message: 'School Fetched successfully',
            data: getSchool.rows
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}