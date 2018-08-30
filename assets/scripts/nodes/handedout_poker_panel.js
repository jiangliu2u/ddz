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
        },
        passPrefb: {
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
    },
    _createHandedOutPoker: function (msg) {
        console.log(msg);
        switch (msg["seatId"]) {
            case 0:
                if (g.player.seatId === 1) {
                    console.log("左边玩家出牌");
                    let cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
                    cp.setVisible(true);
                    this.hideLeftTimer();
                    this.showPokers(msg["pokers"], this.leftPanel);
                } else {
                    //左边玩家显示倒计时
                    this.leftTimer();

                    console.log("右边玩家出牌");
                    this.showPokers(msg["pokers"], this.rightPanel);
                }
                break;
            case 1:
                if (g.player.seatId === 0) {
                    console.log("右边玩家出牌");
                    this.leftTimer();
                    //左边玩家显示倒计时
                    this.showPokers(msg["pokers"], this.rightPanel);
                } else {
                    console.log("左边玩家出牌");
                    this.hideLeftTimer();
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
                    this.hideLeftTimer();
                    this.showPokers(msg["pokers"], this.leftPanel);
                } else {
                    console.log("右边玩家出牌");
                    //左边玩家显示倒计时,删除之前
                    this.hideLeft();
                    this.leftTimer();
                    this.showPokers(msg["pokers"], this.rightPanel);
                }
                break;
        }
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
    //删除扑克
    hide(panelNode) {
        if (panelNode.children) {
            if (panelNode.children.length !== 0) {
                var children = panelNode.children;
                for (var i = 0, len = children.length; i < len; i++) {
                    if (children[i]._name === "poker") {
                        children[i].destroy();
                    }
                    ;
                }
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
        this.hideLeft();
        this.hideLeftPass();
        this._showTimer(this.leftPanel);
    },
    rightTimer() {
        this.hideRight();
        this.hideRightPass();
        this._showTimer(this.rightPanel);
    },
    _showTimer(panelNode) {
        var clock = cc.instantiate(this.clockPrefb);
        panelNode.addChild(clock);
        clock.setPosition(cc.v2(0, 0));
        var clockScript = clock.getComponent("clock");
        clockScript.startCountdown(20);
    },
    hideTimer(panelNode) {
        if (panelNode.children.length !== 0) {
            var children = panelNode.children;
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
    _showPass(panelNode) {
        var pass = cc.instantiate(this.passPrefb);
        panelNode.addChild(pass);
        pass.setPosition(cc.v2(0, 0));
    },
    rightPass() {
        this.hideRightTimer();
        this.hideRight();
        this._showPass(this.rightPanel)
    },
    leftPass() {
        this.hideLeft();
        this.hideLeftTimer();
        this._showPass(this.leftPanel);
    },
    selfPass() {
        this.hideSelf();
        this._showPass(this.selfPanel);
    },
    _hidePass: function (panelNode) {
        if (panelNode.children.length !== 0) {
            var children = panelNode.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i]._name === "pass") { children[i].active = true };
            }
        }
    },
    hideRightPass() {

        this._hidePass(this.rightPanel);
    },
    hideLeftPass() {

        this._hidePass(this.leftPanel);
    },
    hideSelfPass() {
        this._hidePass(this.selfPanel);
    },


    // update (dt) {},
});


