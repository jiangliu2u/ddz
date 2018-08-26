/**
 * 所有事件都在这里触发
 */
const common = require('_init');

(function (common) {

    var Protocol = {

        
        init: function () {
            
            console.log('Protocol初始化');
            this._onEnterTable();
            this._onDealPoker();
            this._onDiscard();
            this._onPass();
            this._onAllPlayers();
            this._onGameOver();

        },

        _onCreateRoom: function () {
            g.player.register('create room', function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_CREATE_ROOM, data);
            });
        },
        _onAllPlayers:function(){
            g.player.register(common.EventType.MSG_DDZ_ALL_PLAYERS, function (data) {
                console.log("MSG_DDZ_ALL_PLAYERS");
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_ALL_PLAYERS, data);
            });
        },
        _onEnterTable: function() {
            console.log("_onEnterTable");
            g.player.register(common.EventType.MSG_DDZ_ENTER_TABLE, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_ENTER_TABLE, data);
            });
        },
        _onDealPoker:function(){
            g.player.register(common.EventType.MSG_DDZ_DEAL_POKER, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_DEAL_POKER, data);
            });
        },
        _onDiscard:function(){
            g.player.register(common.EventType.MSG_DDZ_DISCARD, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_DISCARD, data);
            });
        },
        _onPass:function(){
            g.player.register(common.EventType.MSG_DDZ_PASS, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_PASS, data);
            });
        },
        _onGameOver:function(){
            g.player.register(common.EventType.MSG_DDZ_GAME_OVER, function (data) {
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_GAME_OVER, data);
            });
        },
        _onTest: function () {
            g.player.register('test', function (data) {
                console.log(data);
                g.player.emit("test",data);
            });
        },

        register: function(cmd, handler) {
            // todo
            this.cmdMap[cmd] = handler;
        },

        _onRecived: function(data) {
            // todo 这里收到所有的消息，然后分发给这里的函数，进行处理，然后通过事件通知出去

            var josn = JSON.parse(data);

            var cmd = jons['cmd'];

            var handler = this.cmdMap[cmd];
        
            handler(data);
        
        }
    }

    common.Protocol = Protocol;

})(common);


