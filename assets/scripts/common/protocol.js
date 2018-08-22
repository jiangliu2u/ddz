/**
 * 
 */
const common = require('_init');

(function (common) {

    var Protocol = {

        // todo 写的不好
        init: function () {
            
            // todo
            // this.register('create_room', this._onCreateRoom);

            this._onEnterTable();
            this._onCreateRoom();
            // this._onTest();

        },

        _onCreateRoom: function () {
            g.player.register('create room', function (data) {
                console.log(data);
                console.log('hahah');
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_CREATE_ROOM, data);
            });
        },

        _onEnterTable: function() {
            console.log("_onEnterTable");
            g.player.register('MSG_DDZ_ENTER_TABLE', function (data) {
                console.log(data);
                common.EventDispatcher.trigger(common.EventType.MSG_DDZ_ENTER_TABLE, data);
            });
        },
        _onTest: function () {
            g.player.register('test', function (data) {
                console.log(data);
                g.player.emit("test",data);
                //common.EventDispatcher.trigger(common.EventType.MSG_DDZ_ENTER_TABLE, data);
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


