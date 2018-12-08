const common = require("../common/_init");
cc.Class({
    extends: cc.Component,
    properties: {
        prepareBtn: {
            default: null,
            type: cc.Node
        }
    },
    setVisible: function (v) {
        this.prepareBtn.active = v;
    },
    // LIFE-CYCLE CALLBACKS:
    zhunbei: function () {
        console.log("prepare clicked");
        g.player.sendMsg(common.EventType.MSG_DDZ_PLAYER_PREPARED, { cmd: "prepare", playerId: g.player.id });
        this.setVisible(false);
    },
    onLoad: function () { },

    start: function () {

    },

    // update (dt) {},
});
