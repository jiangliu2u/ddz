"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
let log4js = require("log4js");
let Log;
(function (Log) {
    log4js.configure({
        appenders: {
            "out": {
                "type": "console"
            },
            "date": {
                "type": "dateFile",
                "filename": "logs/log_date/date",
                "pattern": "yyyyMMdd.log",
                "alwaysIncludePattern": true
            }
        },
        categories: {
            "default": {
                "appenders": ["out", "date"],
                "level": "trace"
            },
            "ddz": {
                "appenders": ["out", "date"],
                "level": "trace"
            }
        },
    });
    let logger = log4js.getLogger("ddz");

    /**
     * 输出info级别的日志。
     * @param message {string} 日志内容
     * @param args 参数
     */
    function info(message) {
        let args = [];
        for (let _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        logger.info.apply(logger, [message].concat(args));
    }

    /**
     * 输出warn级别的日志。
     * @param message {string} 日志内容
     * @param args 参数
     */
    function warn(message) {
        let args = [];
        for (let _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        logger.warn.apply(logger, [message].concat(args));
    }

    /**
     * 输出error级别的日志。
     * @param message {string} 日志内容
     * @param args 参数
     */
    function error(message) {
        let args = [];
        for (let _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        logger.error.apply(logger, [message].concat(args));
    }

    Log.info = info;
    Log.warn = warn;
    Log.error = error;
})(Log || (Log = {}));
module.exports = Log;
