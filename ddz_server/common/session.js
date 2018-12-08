function Session(socket) {
    this.socket = socket;
    this.id = socket.id;
}

Session.prototype = {
    sendMsg: function (cmd, msg) {
        this.socket.emit(cmd, msg);
    },

};
module.exports = Session;