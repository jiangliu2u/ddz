

const common = require('../common/_init');
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
        },
        nameLbl: {
            default: null,
            type: cc.Label
        },
        coinLbl: {
            default: null,
            type: cc.Label
        },
        settings: {
            default: null,
            type: cc.Node
        },
        mail: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function () {
        cc.debug.setDisplayStats(false);//不显示fps
        this.loadingMask.active = false;

        //以下监听服务器传来的房间列表，触发后显示房间，根据点击的桌子id进入指定房间
        // first scene - cocos loading
        // 2nd scene - my loading connect
        // 3rd recevied success cmd: get homeinfo(userinfo)
        // 4th succ: loading home scene
        this.settings = cc.find("Canvas/settings");
        this.mail = cc.find("Canvas/mail");
        this.nameLbl.string = g.player.name || 'jiangliu';
        this.coinLbl.string = g.player.coin || -9999;
        g.getLeftPlayerSeatId = function (selfSeatId) {
            return (selfSeatId + 2) % 3;
        };
        g.getRightPlayerSeatId = function (selfSeatId) {
            return (selfSeatId + 1) % 3;
        };
        this.showTables(g.player.tables)
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_ALL_TABLES, this.showTables, this);



    },
    ctor: function () {

    },

    onDestroy() {
        console.log("onDestroy");
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_CREATE_ROOM, this.onCreateRoom, this);
    },
    showSettings() {
        // cc.loader.loadRes("prefab/dialog/settings", (errorMessage, prefab) => {
        //     if (errorMessage) {
        //         cc.log("加载设置预载资源出错");
        //         return;
        //     }
        //     console.log(this);
        //     this.settings = cc.instantiate(prefab);
        //     this.node.addChild(this.settings);
        //     this.settings.setPosition(cc.v2(0, 0));
        //     console.log("settings");
        // });
        this.settings.active = true;
    },
    hideSettings() {
        this.settings.active = false;
    },
    showMail() {
        this.mail.active = true;
    },
    hideMail() {
        this.mail.active = false;
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
