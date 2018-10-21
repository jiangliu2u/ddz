

const common = require('../common/_init');
cc.Class({
    extends: cc.Component,
    properties: {

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
        },
        playWay: {
            default: null,
            type: cc.Node
        },
        tableSelection: {
            default: null,
            type: cc.Node
        },
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
        this.playWay = cc.find("Canvas/playWay");
        this.tableSelection = cc.find("Canvas/Home/tableSelection");
        this.nameLbl.string = g.player.name || 'jiangliu';
        this.coinLbl.string = g.player.coin || -9999;
        g.getLeftPlayerSeatId = function (selfSeatId) {
            return (selfSeatId + 2) % 3;
        };
        g.getRightPlayerSeatId = function (selfSeatId) {
            return (selfSeatId + 1) % 3;
        };

    },
    ctor: function () {

    },

    onDestroy() {
        console.log("onDestroy");
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_CREATE_ROOM, this.onCreateRoom, this);
    },
    showEnterTable(){

    },
    showSettings() {
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
    showPlayWay() {
        this.playWay.active = true;
    },
    hidePlayWay() {
        this.playWay.active = false;
    },
    showTableSelection() {
        this.tableSelection.active = true;
    },
    hideTableSelection() {
        this.tableSelection.active = false;
    },

    start: function () {

    },

    // update (dt) {},
});
