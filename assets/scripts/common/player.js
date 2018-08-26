var common = require("./_init");
function Player(socket) {
    this.socket = socket;
    this.id = this.socket.id;
    this.accountId = Player.ID;
    Player.ID++;
    this.seatId=null;
    this.nickName = "jdakfdja;";
    this.coin = Math.random() * 10000;
    this.gender = Player.GENDER.SECRET;
}
Player.prototype = {
    sendMsg: function (cmd, msg) {
        this.socket.emit(cmd, msg);
    },
    joinTable: function (tableId) {
        this.socket.join(tableId);
    },

    register: function (cmd, callback) {
        var self = this;
        this.socket.on(cmd, function (data) {
            if (callback) {
                callback(data);
            }
        });
    },
    setSeatId(id){
        this.seatId = id;
    },
    connected(data){
        common.EventDispatcher.trigger(common.EventType.MSG_DDZ_ALL_TABLES,data);
    }
};
Player.GENDER = {
    MALE: 1,
    FEMALE: 2,
    SECRET: 3
};
module.exports = Player;