
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
        showBoard: {
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
        this.tableSelection = cc.find("Canvas/Home/tableSelection");
        this.loading = cc.find("Canvas/loading");
        this.nameLbl.string = g.player.name || 'jiangliu';
        this.coinLbl.string = g.player.coin || -9999;
        
        g.getLeftPlayerSeatId = function (selfSeatId) {
            return (selfSeatId + 2) % 3;
        };
        g.getRightPlayerSeatId = function (selfSeatId) {
            return (selfSeatId + 1) % 3;
        };
        console.log(g.player);
    },
    onBtnSettings(){
        this.Board();
        this.showBoard.getComponent("showBoard").setTitle("设置");
    },
    onBtnMails() {
        this.Board();
        this.showBoard.getComponent("showBoard").setTitle("邮件");
    },
    onBtnPlayMethods() {
        this.Board();
        this.showBoard.getComponent("showBoard").setTitle("玩法");
    },
    onBtnScores() {
        this.Board();
        this.showBoard.getComponent("showBoard").setTitle("战绩");
    },
    onBtnFeedback() {
        this.Board();
        this.showBoard.getComponent("showBoard").setTitle("反馈");
    },
    onBtnShare() {
        this.Board();
        this.showBoard.getComponent("showBoard").setTitle("分享");
    },
    onDestroy() {
        console.log("onDestroy");
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_CREATE_ROOM, this.onCreateRoom, this);
    },
    showEnterTable(){

    },
    Board(){
        this.showBoard.active = true;
    },
    showTableSelection() {
        this.tableSelection.active = true;
    },
    hideTableSelection() {
        this.tableSelection.active = false;
    },
    enterTable(id){
        g.player.sendMsg(common.EventType.MSG_DDZ_ENTER_TABLE,{"cmd":"join","tableId":id,"playerId":g.player.id});
        this.loading.active = true;
        cc.director.loadScene("Game");
    },
    start: function () {

    },

    // update (dt) {},
});
