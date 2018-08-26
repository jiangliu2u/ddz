window.g = {};
const common = require('./common/_init');
const Player = require("./common/player");
cc.Class({
    extends: cc.Component,
    properties: {
        table: {
            default: null,
            type: cc.Prefab
        },
        tableListPanel: {
            default: null,
            type: cc.Node
        },
        facePrefab: {
            default: null,
            type: cc.Prefab
        },
        loadingAnimation: {
            default: null,
            type: cc.Animation
        },
        loadingMask: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function () {
        cc.debug.setDisplayStats(false);//不显示fps
        this.loadingMask.active = false;
        if (cc.sys.isNative) {
            var io = SocketIO;
        } else {
            var io = require('./common/socket.io');
        }
        var socket = io.connect('http://127.0.0.1:3001');
        var self = this;
        socket.on("yourid", function (data) {
            var id = data['id'];
            g.player = new Player(socket);
            g.player.register(common.EventType.MSG_DDZ_ALL_TABLES, g.player.connected);
        });
        //以下监听服务器传来的房间列表，触发后显示房间，根据点击的桌子id进入指定房间
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_ALL_TABLES, this.showTables, this);
        // first scene - cocos loading
        // 2nd scene - my loading connect
        // 3rd recevied success cmd: get homeinfo(userinfo)
        // 4th succ: loading home scene




    },
    ctor: function () {

    },

    onDestroy() {
        console.log("onDestroy");
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_CREATE_ROOM, this.onCreateRoom, this);
    },

    onCreateRoom(data) {
        cc.director.loadScene('Game');
    },

    createRoom: function () {
        g.player.emit("create room", { 'name': this.id });
        if (this._onClickCallback) {
            this._onClickCallback();
        }
        this.loadingMask.active = true;

        this.loadingAnimation.play('loading');
        cc.director.loadScene('Game');


    },
    showTables: function (data) {
        this.tableListPanel.getComponent("table_list_panel").init(data);
    },
    deleteRoomNode: function (name) {
        for (var i = 0; i < this.node.children.length; i++) {//删除房间列表
            if (this.node.children[i]._name === name) {
                this.node.children[i].destroy();
                console.log(name + "deleted")
            }
        }
    },

    start: function () {

    },

    // update (dt) {},
});
