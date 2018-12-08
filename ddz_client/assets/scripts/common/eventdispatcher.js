const common = require('_init');

(function (common) {

    var EventDispatcher = {

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
            this._eventMap[eventName].push({
                handler: handler,
                scope: scope
            });
        },

        trigger: function (eventName, params) {
            if (!eventName) {
                console.log(eventName);

                console.error("event name is undefined!");
                return;
            }
            var events = this._eventMap[eventName];
            if (!events) {
                console.error("events is undefined! "+eventName);
                return;
            }
            for (var i = 0, len = events.length; i < len; i++) {
                var event = events[i];
                var handler = event.handler;
                if (handler) {
                    handler.call(event.scope, params);
                }
            }
        },

        ignore: function (eventName, handler, scope) {
            var events = this._eventMap[eventName];

            if (!events) {
                return;
            }

            var len = events.length;
            for (var i = len - 1; i >= 0; i--) {
                var event = events[i];

                // todo 测试一下，是否可以将这个handler去掉
                if (event.handler == handler) {
                    events.splice(i, 1);
                }
            }
        }
    };
    common.EventDispatcher = EventDispatcher;

})(common);



// 手牌里面有这些牌[a,b,c,b,e,f,g];

// 点击选中了[b,c,d]

// ai.js
// ai.ChoosePoker(shangjiadepai, shoupai, xuanzhongdepai) return [];
// function ChoosePoker(shangjiadepai, shoupai, xuanzhongdepai) { return xuanzhongdepai;}
// 智能选中 [b,c] [b,c,d,e,f]