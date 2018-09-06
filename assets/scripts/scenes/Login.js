
window.g = {};
const Player = require("../common/player");
const common = require('../common/_init');

cc.Class({
    extends: cc.Component,

    properties: {
        username: { default: null, type: cc.EditBox },
        password: { default: null, type: cc.EditBox },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initSocket();
    },
    initSocket() {
        if (cc.sys.isNative) {
            var io = SocketIO;
        } else {
            var io = require('../common/socket.io');
        }
        var socket = io.connect('http://127.0.0.1:3001');
        // var socket = io.connect('http://192.168.1.8:9999');
        var self = this;
        socket.on("yourid", function (data) {
            var id = data['id'];
            g.player = new Player(socket);
            g.player.register(common.EventType.RESP_DDZ_REGISTER, self.onRegistered, self);
            g.player.register(common.EventType.RESP_DDZ_LOGIN, self.onLogined, self);
        });

    },
    start() {
        //this.username.string = "jay"+Math.floor(Math.random()*200);
        //this.password.string = "ay"+Math.floor(Math.random()*20);
        //this.register();

    },
    login: function () {
        console.log(this.username);
        var username = this.username.string;
        var password = this.password.string;
        if (username.length === 0 || password.length === 0) {
            return;
        }
        if (password.length > 12) {
            return;
        }
        var url = "http://127.0.0.1:3001/users/login/";   
        console.log("username" + username + " password" + password);
        var msg = {};
        msg.username=username; 
        msg.password=password;
        var json = JSON.stringify(msg);
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("POST",url,true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
        xmlHttpRequest.onreadystatechange = this.onLogined;
        console.log(JSON.stringify(msg));
        xmlHttpRequest.send(json);  
        //g.player.sendMsg(common.EventType.MSG_DDZ_LOGIN, msg);
    },
    onLogined: function (response) {

        console.log('onLogined');

        if (!response) {
            console.log('login IS UNDEFINED');
            return;
        }
        var succ = response['error_code'];

        if (succ !== 0) {
            console.error('error code ' + succ);
            return;
        }

        var player = response['user_info'];
        g.player.initPlayerInfo(player);
        console.log(player);
        //cc.director.loadScene("Home");
    },
    register: function () {
        console.log(this.username);
        var username = this.username.string;
        var password = this.password.string;
        if (username.length === 0 || password.length === 0) {
            return;
        }
        if (password.length > 12) {
            return;
        }
        console.log("username" + username + " password" + password);
        var msg = {
            cmd: 'register',
            username: username, // 
            password: password, //password最长12位，不允许空格，不足补充空格到12位md5(password+sockeId)
            token: g.player.id,//socketId
            socketId: g.player.id
        };
        console.log(JSON.stringify(msg));
        g.player.sendMsg(common.EventType.MSG_DDZ_REGISTER, msg);

    },
    onRegistered: function (response) {

        if (!response) {
            console.log('RESPONSE IS UNDEFINED');
            return;
        }
        var succ = response['error_code'];

        if (succ !== 0) {
            console.error('error code ' + succ);
            return;
        }

        var player = response['player_info'];
        g.player.tables = response["tables"];
        g.player.initPlayerInfo(player);
        console.log(player);
        cc.director.loadScene("Home");
        //

    },
    // update (dt) {},
});
