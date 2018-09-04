const common = require("../common/_init");

cc.Class({
    extends: cc.Component,

    properties: {
        altas: {
            default: null,
            type: cc.SpriteAtlas
        },
        winOrLose: {
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
        this.node.setScale(0);
    },
    leave(){
        g.player.sendMsg(common.EventType.MSG_DDZ_PLAYER_LEAVE, { cmd: "leave", playerID: g.player.id });
        cc.director.loadScene("Home");

    },
    start() {
    },
    setWinOrLose(winOrLose) {
        if (winOrLose) {
            this.winOrLose.spriteFrame = this.altas.getSpriteFrame("ddz_gameover_word_win");
        } else {
            this.winOrLose.spriteFrame = this.altas.getSpriteFrame("ddz_gameover_lose");
        }
    },
    // update (dt) {},
});
