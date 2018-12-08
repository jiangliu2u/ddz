const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const Log = require("../../common/Log");
const Config = require('../config');
const userSQL = require('../db/usersql');
const ERROR_CODE = require(`../error_code`);
const crypto = require("crypto");
const knex = require("../db/db");
const jwt = require('jsonwebtoken');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
const pool = mysql.createPool(Config.mysql);
// 响应一个JSON数据
let responseJSON = function (res, ret) {
    res.json(ret);
};

// 用户注册
router.post('/reg', async function (req, res, next) {
    let response = null;
    let users = await knex("users").select().where("username", req.body.username);
    if (users.length !== 0) {
        response = {
            code: ERROR_CODE.USERNAME_ALREADY_EXITS,
            msg: '注册失败'
        };
        Log.error("用户已存在");
        responseJSON(res, response);

    } else {
        const hmac = crypto.createHmac('sha256', req.body.username);
        let pwd_hash = hmac.update(req.body.password).digest("hex");
        await knex("users").insert({username: req.body.username, password: pwd_hash,join_date:new Date()}).then(() => {
            response = {
                code: ERROR_CODE.SUCCESS,
                msg: '注册成功'
            };
            Log.info("注册成功");
            responseJSON(res, response)
        });

    }
});

router.post('/login', async function (req, res, next) {
    const hmac = crypto.createHmac('sha256', req.body.username);
    let pwd_hash = hmac.update(req.body.password).digest("hex");
    await knex("users").select().where({username: req.body.username, password: pwd_hash}).then(users => {
        let token = jwt.sign({ username: users[0].username }, Config.JWT_SECRET, {
            expiresIn: '7d'// 授权时效24小时
        });
        let response = {
            code: ERROR_CODE.SUCCESS,
            msg: '登录成功',
            user_info: {
                id:users[0].id,
                username:users[0].username,
                coin:users[0].coin
            },
            token:token
        };

        Log.info("登录成功");
        responseJSON(res, response)
    });
});


module.exports = router;