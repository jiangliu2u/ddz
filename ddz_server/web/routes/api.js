const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const Config = require('../config');
const userSQL = require('../db/usersql');
const ERROR_CODE = require(`../error_code`);
const jwt = require('jsonwebtoken');
let responseJSON = function (res, ret) {
    res.json(ret);
};
router.use(function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    let response;
    if (token) {
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, Config.jwtsecret, function (err, decoded) {
            if (err) {
                response = {
                    error_code: ERROR_CODE.TOKEN_ERROR,
                    msg: 'token过期或错误'
                };
                responseJSON(res, response);
            } else {
                // 如果验证通过，在req中写入解密结果
                req.decoded = decoded;
                //console.log(decoded)  ;
                response = {
                    error_code: ERROR_CODE.SUCCESS,
                    msg: 'token有效'
                };
                responseJSON(res, response);
                next(); //继续下一步路由
            }
        });
    } else {
        response = {
            error_code: -9,
            msg: ERROR_CODE.TOKEN_ERROR
        };
        responseJSON(res, response);
    }
});
module.exports = router;