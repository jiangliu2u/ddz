const Log = require("./Log");
let EventDispatcher = {

    _eventMap: {},

    listen: function (eventName, handler, scope) {
        if (!eventName) {
            console.error("event name is undefined!");
            return;
        }
        if (!handler) {
            console.error("event handler is undefined!");
            return;
        }
        this._eventMap[eventName] = this._eventMap[eventName] || [];
        Log.info(eventName+"   绑定....");
        this._eventMap[eventName].push({
            handler: handler,
            scope: scope
        });
    },

    trigger: function (eventName, params) {
        if (!eventName) {
            console.error("event name is undefined!");
            return;
        }
        let events = this._eventMap[eventName];
        if (!events) {
            console.error("events is undefined!");
            return;
        }

        for (let i = 0, len = events.length; i < len; i++) {
            let event = events[i];
            let handler = event.handler;
            if (handler) {
                handler.call(event.scope, params);
            }
        }
    },

    ignore: function (eventName, handler, scope) {
        let events = this._eventMap[eventName];

        if (!events) {
            return;
        }

        let len = events.length;
        for (let i = len - 1; i >= 0; i--) {
            let event = events[i];

            // todo 测试一下，是否可以将这个handler去掉
            if (event.handler === handler) {
                events.splice(i, 1);
            }
        }
    }
};

module.exports = EventDispatcher;


