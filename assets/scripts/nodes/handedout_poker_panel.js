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
        clockPrefb: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
        this._M = 24;
        this._W = 70;
        this._H = 92;

    },
    onLoad() {
        g.right = this.rightPanel;
        g.left = this.leftPanel;
        g.self = this.selfPanel;
    },
    hidePass: function (loc) {
        switch (loc) {
            case "left":
                if (this.leftPanel.children.length !== 0) {
                    console.log("删除左边不要");
                    var children = this.leftPanel.children;
                    for (var i = 0, len = children.length; i < len; i++) {
                        if (children._name === "pass") { children[i].active = false };
                    }
                }
                break;
            case "right":
                if (this.rightPanel.children.length !== 0) {
                    console.log("删除右边边不要");
                    var children = this.rightPanel.children;
                    for (var i = 0, len = children.length; i < len; i++) {
                        if (children._name === "pass") { children[i].active = false };
                    }
                }

                break;
            case "self":
                if (this.selfPanel.children.length !== 0) {
                    console.log("删除自己");
                    var children = this.selfPanel.children;
                    for (var i = 0, len = children.length; i < len; i++) {
                        if (children._name === "pass") { children[i].active = false };
                    }
                }
                break;
        }
    },
    showPass: function (loc) {
        switch (loc) {
            case "left":
                if (this.leftPanel.children.length !== 0) {
                    console.log("删除左边不要");
                    var children = this.leftPanel.children;
                    for (var i = 0, len = children.length; i < len; i++) {
                        if (children._name === "pass") { children[i].active = true };
                    }
                }
                break;
            case "right":
                if (this.rightPanel.children.length !== 0) {
                    console.log("删除右边边不要");
                    var children = this.rightPanel.children;
                    for (var i = 0, len = children.length; i < len; i++) {
                        if (children._name === "pass") { children[i].active = true };
                    }
                }

                break;
            case "self":
                if (this.selfPanel.children.length !== 0) {
                    console.log("删除自己");
                    var children = this.selfPanel.children;
                    for (var i = 0, len = children.length; i < len; i++) {
                        if (children._name === "pass") { children[i].active = true };
                    }
                }
                break;
        }
    },
    _createHandedOutPoker: function (msg) {
        console.log(msg);
        switch (msg["seatId"]) {
            case 0:
                if (g.player.seatId === 1) {
                    console.log("左边玩家出牌");
                    let cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
                    cp.setVisible(true);
                    this.hidePass("self");
                    this.hidePass("left");
                    this.showPokers(msg["pokers"], this.leftPanel);
                } else {
                    //左边玩家显示倒计时
                    this.leftTimer();

                    console.log("右边玩家出牌");
                    this.hidePass("right");
                    this.showPokers(msg["pokers"], this.rightPanel);
                }
                break;
            case 1:
                if (g.player.seatId === 0) {
                    console.log("右边玩家出牌");
                    this.hidePass("right");
                    this.leftTimer();

                    //左边玩家显示倒计时
                    this.showPokers(msg["pokers"], this.rightPanel);
                } else {
                    console.log("左边玩家出牌");
                    this.hidePass("self");
                    this.hidePass("left");
                    let cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
                    cp.setVisible(true);
                    this.showPokers(msg["pokers"], this.leftPanel);
                }
                break;
            case 2:
                if (g.player.seatId === 0) {
                    console.log("左边玩家出牌");
                    let cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
                    cp.setVisible(true);
                    this.hidePass("self");
                    this.hidePass("left");
                    this.showPokers(msg["pokers"], this.leftPanel);
                } else {
                    console.log("右边玩家出牌");
                    //左边玩家显示倒计时,删除之前
                    this.hideLeft();
                    this.leftTimer();
                    this.hidePass("right");
                    this.showPokers(msg["pokers"], this.rightPanel);
                }
                break;
        }
        //g.handedoutPokers = { id: msg["playerId"], pokers: msg["pokers"] };
    },
    showPokers(pokers, panelNode) {
        this.hide(panelNode);
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

    hide(panelNode) {
        if (this.selfPanel.children.length !== 0) {
            var children = this.selfPanel.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i]._name === "poker") {
                    children[i].destroy();
                }
                ;
            }
        }
    },
    hideRight() {

        this.hide(this.rightPanel);
    },
    hideLeft() {
        this.hide(this.lefttPanel);

    },
    hideSelf() {
        this.hide(this.selfPanel);
    },
    start() {

    },
    leftTimer() {
        console.log("left timer");
        this.showTimer(this.leftPanel);
    },
    rightTimer() {
        console.log("right timer");
        this.showTimer(this.rightPanel);
    },
    showTimer(panelNode) {
        var clock = cc.instantiate(this.clockPrefb);
        panelNode.addChild(clock);
        clock.setPosition(cc.v2(0, 0));
        var clockScript = clock.getComponent("clock");
        clockScript.startCountdown(20);
    },
    hideTimer(panelNode) {
        if (panelNode.children.length !== 0) {
            var children = this.selfPanel.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i]._name === "clock") {
                    children[i].destroy();
                }
            }
        }
    },
    hideRightTimer() {
        this.hideTimer(this.rightTimer);
    },
    hideLeftTimer() {
        this.hideTimer(this.leftPanel);
    },

    // update (dt) {},
});


