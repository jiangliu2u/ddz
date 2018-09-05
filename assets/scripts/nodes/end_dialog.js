const common = require("../common/_init");

cc.Class({
    extends: cc.Component,

    properties: {
        win: {
            default: null,
            type: cc.Node
        },
        lose: {
            default: null,
            type: cc.Node
        },
        leaveBtn: {
            default: null,
            type: cc.Node
        },
        continueBtn: {
            default: null,
            type: cc.Node
        },
    },

    onLoad() {

    },
    continue() {
        g.player.sendMsg(common.EventType.MSG_DDZ_PLAYER_PREPARED, { cmd: "prepare", playerId: g.player.id });
        this.setVisible(false);
    },
    leave() {
        g.player.sendMsg(common.EventType.MSG_DDZ_PLAYER_LEAVE, { cmd: "leave", playerId: g.player.id });
        g.player.setSeatId(-1);
        this.setVisible(false);
        cc.director.loadScene("Home");

    },
    start() {
    },
    setVisible(v) {
        this.node.active = v;
    },
    setWinOrLose(winOrLose) {
        if (winOrLose) {
            this.win.active=true;
            this.lose.active = false;
            console.log("show win");
        } else {
            this.win.active=false;
            this.lose.active=true;
            console.log("show lose");
        }
    },
    show(v, winOrlose) {
        this.setVisible(v);
        this.setWinOrLose(winOrlose);
    },
    // update (dt) {},
});
