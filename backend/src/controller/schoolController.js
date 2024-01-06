const connection = require('../database/connection');
const { dbSql, dbScript } = require('../utils/db_script');

module.exports.create = async (req, res) => {
    try {
        const { name, photo } = req.body;
        const { id } = req.user;
        let s0 = dbScript(dbSql['Q3'], {
            var1: name,
            var2: photo,
            var3: id
        })
        let createSchool = await connection.query(s0);
        return res.status(201).json({
            message: 'School created successfully',
            data: createSchool.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.getSchool = async (req, res) => {
    try {
        const { id } = req.user;
        let s0 = dbScript(dbSql['Q4'], {
            var1: id
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