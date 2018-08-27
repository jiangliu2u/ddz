//该节点显示玩家出的牌
cc.Class({
    extends: cc.Component,

    properties: {
        leftPanel: {
            default: null,
            type: cc.Node
        },
        rightPanel: {
            default: null,
            type: cc.Node
        },
        selfPanel: {
            default: null,
            type: cc.Node
        },
        poker: {
            default: null,
            type: cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
        this._M = 24;
        this._W = 70;
        this._H = 92;
    },
    // onLoad () {},
    _createHandedOutPoker: function (msg) {
        console.log(msg);
        switch (msg["seatId"]) {
            case 0:
                if (g.player.seatId === 1) {
                    let cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
                    cp.setVisible(true);
                    this.showPokers(msg["pokers"], this.leftPanel);
                    this.hideRight();
                } else {
                    this.showPokers(msg["pokers"], this.rightPanel);
                    this.hideLeft();
                }
                break;
            case 1:
                if (g.player.seatId === 0) {
                    this.showPokers(msg["pokers"], this.rightPanel);
                    this.hideLeft();
                    this.hideHandedoutPokers(this.selfPanel);
                } else {
                    let cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
                    cp.setVisible(true);
                    this.showPokers(msg["pokers"], this.leftPanel);
                    this.hideRight();

                }
                break;
            case 2:
                if (g.player.seatId === 0) {
                    let cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
                    cp.setVisible(true);
                    //this.hideHandedoutPokers(this.leftPanel);
                    this.showPokers(msg["pokers"], this.leftPanel);
                    this.hideRight();


                } else {
                    this.showPokers(msg["pokers"], this.rightPanel);
                    this.hideHandedoutPokers(this.selfPanel);
                    this.hideLeft();
                }
                break;
        }
        //g.handedoutPokers = { id: msg["playerId"], pokers: msg["pokers"] };
    },
    showPokers(pokers, panelNode) {
        this.hideHandedoutPokers(panelNode);
        var len = pokers.length;
        var totalWidth = (len - 1) * this._M + this._W;
        var startPos = -totalWidth / 2;
        for (var i = 0; i < len; i++) {
            var pokerPrefab = cc.instantiate(this.poker);
            var script = pokerPrefab.getComponent("poker");
            script.initPoker(pokers[i]);
            panelNode.addChild(pokerPrefab);
            pokerPrefab.setScale(0.5);
            pokerPrefab.setPosition(cc.v2(startPos + i * this._M, 0));
        }
    },
    hideHandedoutPokers(panelNode) {

        if (!panelNode.children) {
            var children = panelNode.children;
            for (var i = 0, len = children.length; i < len; i++) {
                children[i].destroy();
            }
        }

    },
    hideRight() {

        if (this.rightPanel.children.length !== 0) {
            console.log("删除右边");
            var children = this.rightPanel.children;
            for (var i = 0, len = children.length; i < len; i++) {
                children[i].destroy();
            }
        }
    },
    hideLeft() {

        if (this.lefttPanel.children.length !== 0) {
            console.log("删除左边");
            var children = this.lefttPanel.children;
            for (var i = 0, len = children.length; i < len; i++) {
                children[i].destroy();
            }
        }
    },
    hideSelf() {
        console.log("self");
        console.log(this.selfPanel.children);
        console.log(this.selfPanel.children.length);
        if (this.selfPanel.children.length !== 0) {
            console.log("删除自己");
            var children = this.selfPanel.children;
            for (var i = 0, len = children.length; i < len; i++) {
                children[i].destroy();
            }
        }
    },
    start() {

    },

    // update (dt) {},
});
