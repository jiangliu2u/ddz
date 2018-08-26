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
                    cc.find("Canvas/controlPanel").active = true;
                    this.showPokers(msg["pokers"], this.leftPanel);
                    this.hideHandedoutPokers(this.rightPanel);

                } else {
                    this.showPokers(msg["pokers"], this.rightPanel);
                    this.hideHandedoutPokers(this.selfPanel);
                }
                break;
            case 1:
                if (g.player.seatId === 0) {
                    this.showPokers(msg["pokers"], this.rightPanel);
                    this.hideHandedoutPokers(this.selfPanel);
                } else {
                    cc.find("Canvas/controlPanel").active = true;
                    this.showPokers(msg["pokers"], this.leftPanel);
                    this.hideHandedoutPokers(this.rightPanel);
                }
                break;
            case 2:
                if (g.player.seatId === 0) {
                    cc.find("Canvas/controlPanel").active = true;
                    this.showPokers(msg["pokers"], this.leftPanel);
                    this.hideHandedoutPokers(this.rightPanel);


                } else {
                    this.showPokers(msg["pokers"], this.rightPanel);
                    this.hideHandedoutPokers(this.selfPanel);
                }
                break;
        }
        //g.handedoutPokers = { id: msg["playerId"], pokers: msg["pokers"] };
    },
    showPokers(pokers, panelNode) {
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
    hideHandedoutPokers(panelNode){
        var children = panelNode.children;
        for(var i =0,len = children.length;i<len;i++){
            children[i].destroy();
        }
    },
    start() {

    },

    // update (dt) {},
});
