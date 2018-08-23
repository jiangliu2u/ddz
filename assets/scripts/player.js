function Player(socket) {
    this.socket = socket;
    this.id = this.socket.id;
    this.accountId = Player.ID;
    Player.ID++;

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
        console.log("player register");
        var self = this;
        this.socket.on(cmd, function (data) {
            if (callback) {
                console.log(data);
                callback(data);
            }
        });
    },
};
Player.GENDER = {
    MALE: 1,
    FEMALE: 2,
    SECRET: 3
};
module.exports = Player;