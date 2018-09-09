/**
 * 所有事件都在这里触发
 */
const common = require('_init');

(function (common) {

    var Protocol = {


        init: function () {
            this._onEnterTable();
            this._onDealPoker();
            this._onDiscard();
            this._onPass();
            this._onAllPlayers();
            this._onEndGame();
            this._onCallLandlord();
            this._onNoCallLandlord();
            this._onRobLandlord();
            this._onNoRobLandlord();
            this._onStart();
        },

        _onCreateRoom: function () {
            g.player.register('create room', function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_CREATE_ROOM, data);
            });
        },
        _onAllPlayers: function () {
            g.player.register(common.EventType.MSG_DDZ_ALL_PLAYERS, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_ALL_PLAYERS, data);
            });
        },
        _onEnterTable: function () {
            g.player.register(common.EventType.MSG_DDZ_ENTER_TABLE, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_ENTER_TABLE, data);
            });
        },
        _onStart: function () {
            g.player.register(common.EventType.MSG_DDZ_START, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_START, data);
            });
        },
        _onCallLandlord: function () {
            g.player.register(common.EventType.MSG_DDZ_CALL_LANDLORD, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_CALL_LANDLORD, data);
            });
        },
        _onNoCallLandlord: function () {
            g.player.register(common.EventType.MSG_DDZ_NO_CALL_LANDLORD, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_NO_CALL_LANDLORD, data);
            });
        },
        _onRobLandlord: function () {
            g.player.register(common.EventType.MSG_DDZ_ROB_LANDLORD, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_NO_ROB_LANDLORD, data);
            });
        },
        _onNoRobLandlord: function () {
            g.player.register(common.EventType.MSG_DDZ_ENTER_TABLE, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_ENTER_TABLE, data);
            });
        },
        _onDealPoker: function () {
            g.player.register(common.EventType.MSG_DDZ_DEAL_POKER, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_DEAL_POKER, data);
            });
        },
        _onDiscard: function () {
            g.player.register(common.EventType.MSG_DDZ_DISCARD, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_DISCARD, data);
            });
        },
        _onPass: function () {
            g.player.register(common.EventType.MSG_DDZ_PASS, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_PASS, data);
            });
        },
        _onEndGame: function () {
            g.player.register(common.EventType.MSG_DDZ_GAME_OVER, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_GAME_OVER, data);
            });
        },
        _onTest: function () {
            g.player.register('test', function (data) {
                console.log(data);
                g.player.emit("test", data);
            });
        },

        register: function (cmd, handler) {
            // todo
            this.cmdMap[cmd] = handler;
        },

        _onRecived: function (data) {
            // todo 这里收到所有的消息，然后分发给这里的函数，进行处理，然后通过事件通知出去

            var josn = JSON.parse(data);

            var cmd = jons['cmd'];

            var handler = this.cmdMap[cmd];

            handler(data);

        }
    }

    common.Protocol = Protocol;

})(common);


