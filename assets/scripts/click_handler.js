const PokerPlay = require('poker_handler');
const Util = require('util');
cc.Class({
    extends: cc.Component,

    properties: {
        Game: {
            default: null,
            type: cc.Node
        }

    },


    onLoad: function () {
        this.control = this.Game.getComponent("game");
        this.control.io = g.io;
    },
    //出牌，并向服务器发送数据，出牌的数据
    playPoker: function () {
        console.log("是否能出牌:" + this.control.status);
        if (this.control.status) {
            if (!this.control.targetList) {
                var pokerToPlay = this.control.getSelectedPoker();
                console.log("targetList空的");
                if (pokerToPlay) {
                    this.control.io.emit("play poker", pokerToPlay);
                    this.control.controlPanel.active = false;

                }
                else {
                    console.log("不能出 ");
                    throw Util.EXCEPTION.WRONG_POKER_TYPE;
                }
            } else {
                var pokerplay = new PokerPlay();//处理要出的牌
                var pokerToPlay = this.control.getSelectedPoker();
                console.log("clickHandler" + JSON.stringify(pokerToPlay));
                var pokerToPlayWrapper = pokerplay.getPokerWrapper(pokerToPlay);
                console.log(pokerToPlayWrapper);
                if (pokerToPlayWrapper.follow(this.control.targetList)) {
                    this.control.io.emit("play poker", pokerToPlay);
                    this.control.controlPanel.active = false;
                    console.log("跟牌");
                }
                else {
                    console.log("不能跟牌");
                    throw Util.EXCEPTION.CANNOT_FOLLOW;
                }
            }
        }
    },
    dontFollow: function () {
        if (!this.control.targetList) {
            console.log("你现在不能不要");
            return;
        }
        else if (this.control.dontfollow && this.control.status) {
            this.control.io.emit("dont follow");
            this.control.controlPanel.active = false;

        } else {
            console.log("你现在不能不要");
        }
    },
    
    start() {

    },

    // update (dt) {},
});
