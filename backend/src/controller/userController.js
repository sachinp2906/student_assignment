const connection = require('../database/connection');
const { dbSql, dbScript } = require('../utils/db_script');
const generateInviteCode = require('../utils/generateCode');
const bcrypt = require('bcrypt')
const jwt = require('../services/token');

module.exports.signup = async (req, res) => {
    try {
        let { name, email, password, photo } = req.body;
        await connection.query('BEGIN')
        let inviteCodeForParent = generateInviteCode()
        let inviteCodeForTeacher = generateInviteCode()
        password = await bcrypt.hash(password, 10);
        let s0 = dbScript(dbSql['Q1'], {
            var1: name,
            var2: email,
            var3: password,
            var4: photo,
            var5: inviteCodeForParent,
            var6: inviteCodeForTeacher
        })
        let createUser = await connection.query(s0)
        if (createUser.rowCount > 0) {
            await connection.query('COMMIT')
            return res.status(201).json({
                message: 'User Created Successfully',
                data: createUser.rows[0]
            })
        } else {
            await connection.query('ROLLBACK')
            return res.status(400).json({
                message: 'Error Creating User',
            })
        }
    } catch (error) {
        await connection.query('ROLLBACK')
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let s0 = dbScript(dbSql['Q2'], {
            var1: email,
        })
        let checkUser = await connection.query(s0);
        if (checkUser.rowCount > 0) {
            let checkPassword = await bcrypt.compare(password, checkUser.rows[0].password);
            if (checkPassword) {
                let payload = {
                    id: checkUser.rows[0].user_id,
                    email: checkUser.rows[0].email,
                };
                let token = await jwt.issueJWT(payload);
                res.status(200).json({
                    message: "User Login Successfully.",
                    token: token,
                    data: {
                        user_id: checkUser.rows[0].user_id,
                        email: checkUser.rows[0].email,
                    },
                });
            }
            else {
                res.status(400).json({
                    message: "You Entered A Wrong Password.",
                });
            }
        }
        else {
            res.status(404).json({
                message: "This User Does Not Exist.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error: ${error.message}`,
        });
    }
};

