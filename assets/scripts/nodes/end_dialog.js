
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
        leave: {
            default: null,
            type: cc.Node
        },
        continue: {
            default: null,
            type: cc.Node
        },
    },

    onLoad() {

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
