var common = require("./_init");
function Player(socket) {
    this.socket = socket;
    this.id = this.socket.id;
    this.accountId = Player.ID;
    Player.ID++;
    this.status= -1;
    this.seatId = null;
    // this.nickname = "jdakfdja;";
    this.coin = Math.random() * 10000;
    this.gender = 3;
}
Player.prototype = {
    initPlayerInfo(info) {
        this.name = info["username"];
        this.nickName = info["nickname"];
        this.gender = info["gender"];
        this.coin = info["coin"];
    },
    sendMsg: function (cmd, msg, handler) {
        console.log();
        this.socket.emit(cmd, msg, handler);
    },
    joinTable: function (tableId) {
        this.socket.join(tableId);
    },
    register: function (cmd, callback, scope) {
        var self = this;
        this.socket.on(cmd, function (data) {
            if (callback) {
                callback.call(scope, data);
            }
        });
    },
    setSeatId(id) {
        this.seatId = id;
    },
    connected(data) {
        common.EventDispatcher.trigger(common.EventType.MSG_DDZ_ALL_TABLES, data);
    },
    
};
Player.GENDER = {
    MALE: 1,
    FEMALE: 2,
    SECRET: 3
};
module.exports = Player;