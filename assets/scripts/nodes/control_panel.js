const common = require("../common/_init");
const PokerPlay = require("../poker/poker_handler");
cc.Class({
    extends: cc.Component,

    properties: {
        pokerPanel: {
            default: null,
            type: cc.Node
        },
        handedOutPokerPanel: {
            default: null,
            type: cc.Node
        },
        clockPrefb: {
            default: null,
            type: cc.Prefab
        },
        clock: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },
    setVisible(v) {
        if (v) {
            var clock = cc.instantiate(this.clockPrefb);
            this.clock.addChild(clock);
            clock.setPosition(cc.v2(0, 0));
            var clockScript = clock.getComponent("clock");
            clockScript.startCountdown(20);
            var hop = this.handedOutPokerPanel.getComponent("handedout_poker_panel");
            hop.hideSelf();
            this.node.active = true;
        } else {
            if (this.clock.children.length !== 0) { this.clock.children[0].destroy() };
            this.node.active = false;
        }

    },
    //出牌
    discard() {
        var pp = this.pokerPanel.getComponent("poker_panel");
        var pokers = pp.getSelectedPokers();
        var pt = cc.find("Canvas/passTag").getComponent("passTag");
        var ps = [];
        for (var i = 0; i < pokers.length; i++) {
            ps.push(pokers[i].getComponent("poker").value);
        }
        var pokerplay = new PokerPlay();//处理要出的牌
        var pl_wrapper = pokerplay.getPokerWrapper(ps);
        if (g.handedoutPokers["seatId"] === g.player.seatId) {
            if (pl_wrapper) {
                console.log("此前无人出牌可以出牌");
                pp._onDiscard(pokers);
                this.setVisible(false);
                this.showSelfHandeOutPoker(ps);

            } else {
                console.log("此前无人出牌，不符合规则，不可以出牌");
                return;
            }
        } else {

            if (g.player.seatId === g.handedoutPokers["seatId"]) {
                if (pl_wrapper) {
                    console.log("别人不起你的牌");
                    pp._onDiscard(pokers);
                    this.setVisible(false);
                    this.showSelfHandeOutPoker(ps);

                } else {
                    console.log("别人要不起你的牌，但你出的不符合规则");
                    return;
                }
            } else {
                if (pl_wrapper.follow(g.handedoutPokers["pokers"])) {
                    console.log("类型和大小都符合，可以跟牌");
                    pp._onDiscard(pokers);
                    this.setVisible(false);
                    this.showSelfHandeOutPoker(ps);
                }
                else {
                    console.log("类型不对或者大小不对，不可以跟牌");
                    return;
                }

            }

        }

    },
    //不要
    pass() {

        if (g.handedoutPokers["pokers"].length === 0) {
            console.log("你是第一个出牌，不能不要");
        } else {
            if (g.handedoutPokers["seatId"] === g.player.seatId) {
                console.log("别人都不要，该你出牌了，不能不要");
            } else {
                var pp = this.pokerPanel.getComponent("poker_panel");
                pp._onPass();
                console.log("不要");
                var pt = cc.find("Canvas/passTag").getComponent("passTag");
                // pat.rightTimer();
                pt.showSelfPass();
                this.setVisible(false);
            }
        }
    },
    //自己出牌时显示自己出的牌
    showSelfHandeOutPoker(pokers) {
        var hop = this.handedOutPokerPanel.getComponent("handedout_poker_panel");
        hop.showPokers(pokers, hop.selfPanel);
    },


    start() {

    },

    // update (dt) {},
});
