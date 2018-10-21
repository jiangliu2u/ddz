
window.g = {};
const Player = require("../common/player");
const common = require('../common/_init');

cc.Class({
    extends: cc.Component,

    properties: {
        username: { default: null, type: cc.EditBox },
        password: { default: null, type: cc.EditBox },
        loading: { default: null, type: cc.Node }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initSocket();
        this.loading = cc.find("Canvas/loading");
    },
    initSocket() {
        if (cc.sys.isNative) {
            var io = SocketIO;
        } else {
            var io = require('../common/socket.io');
        }
        var socket = io.connect('http://127.0.0.1:3001');
        // var socket = io.connect('http://172.96.224.103:3001');
        socket.on("yourid", (data) => {
            var id = data['id'];
            g.player = new Player(socket);
            g.player.id = id;
            g.player.register(common.EventType.RESP_DDZ_REGISTER, this.onRegistered, self);
            g.player.register(common.EventType.RESP_DDZ_LOGIN, this.onLogined, self);
        });

    },
    start() {
        setTimeout(() => {
            this.username.string = "test1";
            this.password.string = '123';
        }, 100)


    },
    login: function () {
        var username = this.username.string;
        var password = this.password.string;
        if (username.length === 0 || password.length === 0) {
            return;
        }
        if (password.length > 12) {
            return;
        }
        var url = "http://127.0.0.1:3001/users/login/";
        var msg = {};
        msg.username = username;
        msg.password = password;
        var json = JSON.stringify(msg);
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("POST", url, true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
        xmlHttpRequest.onreadystatechange = () => {
            if (xmlHttpRequest.status === 200 && xmlHttpRequest.readyState === 4) {
                this.onLogined(xmlHttpRequest.response)
            }
        };
        xmlHttpRequest.send(json);
        //g.player.sendMsg(common.EventType.MSG_DDZ_LOGIN, msg);
    },
    onLogined: function (response) {

        var response = JSON.parse(response);
        console.log(response);
        if (!response) {
            console.log('login IS UNDEFINED');
            return;
        }
        var succ = response['code'];
        if (succ !== 0) {
            console.error('error code ' + succ);
            return;
        }
        var player = response['user_info'];
        g.player.initPlayerInfo(player);
        this.loading.active =true;
        cc.director.loadScene("Home");
    },
    register: function () {
        var username = this.username.string;
        var password = this.password.string;
        if (username.length === 0 || password.length === 0) {
            return;
        }
        if (password.length > 12) {
            return;
        }
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
        cc.director.loadScene("Home");
        //

    },
    // update (dt) {},
});
