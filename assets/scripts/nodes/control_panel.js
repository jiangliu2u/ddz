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
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },
    setVisible(v) {
        this.node.active = v
    },
    discard() {
        var pp = this.pokerPanel.getComponent("poker_panel");
        var pokers = pp.getSelectedPokers();
        console.log(pokers);
        pp._onDiscard(pokers);
        this.setVisible(false);
        var ps = [];
        for (var i = 0; i < pokers.length; i++) {
            ps.push(pokers[i].getComponent("poker").value);
        }
        this.showSelfHandeOutPoker(ps);
    },
    //显示自己出的手牌
    showSelfHandeOutPoker(pokers) {
        var hop = this.handedOutPokerPanel.getComponent("handedout_poker_panel");
        hop.showPokers(pokers, hop.selfPanel);
    },
    start() {

    },

    // update (dt) {},
});
