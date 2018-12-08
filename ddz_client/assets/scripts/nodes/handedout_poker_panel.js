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
        let cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
        switch (msg["seatId"]) {
            case 0:
                if (g.player.seatId === 1) {
                    console.log("左边玩家出牌");
                    cp.setVisible(true);
                    this.showPokers(msg["pokers"], this.leftPanel);
                    //todo 直接不要，记得删除
                    // setTimeout(function () {
                    //     cp.pass();
                    // }, 50);
                } else {
                    //左边玩家显示倒计时
                    this.hideLeft();
                    console.log("右边玩家出牌");
                    this.showPokers(msg["pokers"], this.rightPanel);
                }
                break;
            case 1:
                if (g.player.seatId === 0) {
                    console.log("右边玩家出牌");
                    //左边玩家显示倒计时
                    this.hideLeft();
                    this.showPokers(msg["pokers"], this.rightPanel);
                } else {
                    //todo 直接不要，记得删除
                    // setTimeout(function () {
                    //     cp.pass();
                    // }, 50);
                    console.log("左边玩家出牌");
                    cp.setVisible(true);
                    this.showPokers(msg["pokers"], this.leftPanel);
                }
                break;
            case 2:
                if (g.player.seatId === 0) {
                    console.log("左边玩家出牌");
                    cp.setVisible(true);
                    this.showPokers(msg["pokers"], this.leftPanel);
                    //todo 直接不要，记得删除
                    // setTimeout(function () {
                    //     cp.pass();
                    // }, 50);
                } else {
                    console.log("右边玩家出牌");
                    this.hideLeft();
                    //左边玩家显示倒计时,删除之前
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
        if (panelNode.children !== undefined) {
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
        this.hide(this.leftPanel);

    },
    hideSelf() {
        this.hide(this.selfPanel);
    },
    deleteAll() { 
        let a = [this.rightPanel,this.selfPanel,this.leftPanel];
        for(var i = 0;i<3;i++){
            if (a[i].children !== undefined) {
                if (a[i].children.length !== 0) {
                    var children = a[i].children;
                    for (var i = 0, len = children.length; i < len; i++) {
                        if (children[i]._name === "poker") {
                            children[i].destroy();
                        }
                        ;
                    }
                }
            }
        }
    },
    start() {

    },




    // update (dt) {},
});


