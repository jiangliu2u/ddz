const config = require('./common/config');
const PokerPlay = require('./poker/poker_handler');
const Util = require('./common/util');
const common = require("./common/_init");
cc.Class({
    extends: cc.Component,
    properties: {
        poker: {
            default: null,
            type: cc.Prefab
        },
        dipaiPanel: {
            default: null,
            type: cc.Node
        },
        pokerPanel: {
            default: null,
            type: cc.Node
        },
        faceNodes: {
            default: null,
            type: cc.Node
        },
        controlPanel: {
            default: null,
            type: cc.Node
        },
        pokerCard: {
            default: null,
            type: cc.Prefab
        },
        status: false,//是否可以出牌
        dontfollow: true,//是否可以不要
        team: 0,//队伍
        win: {
            default: null,
            type: cc.Animation
        },
        lose: {
            default: null,
            type: cc.Animation
        },
        facePrefab: {
            default: null,
            type: cc.Prefab
        },
        clockPrefab: {
            default: null,
            type: cc.Prefab
        },
        endthis:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.debug.setDisplayStats(false);
        
        common.Protocol.init();
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_ENTER_TABLE, this.onPlayerEnterTable, this);
        g.handedoutPokers = { seatId: 0, pokers: [] };
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_DEAL_POKER, this._createHandPoker, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_PASS, this.onOtherPass, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_DISCARD, this.onOtherDiscard, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_GAME_OVER, this.hehe, this);
        this.faceNodes.getComponent("face_node").createSelf({ index: 1 });
        this._setControlPanelVisible(this.status);

    },

    start: function () {
        //this.deletePokerNode('poker');
    },
    _updateDipai(pokers) {

    },
    _setControlPanelVisible() {
        var cp = this.controlPanel.getComponent("control_panel");
        cp.setVisible(this.status);
    },
    _createDipai: function (pokers) {

        for (var i = 0; i < pokers.length; i++) {
            var pokerPrefab = cc.instantiate(this.poker);
            var script = pokerPrefab.getComponent("poker");
            script.initPoker(pokers[i], 1);
            script.doDisable();
            pokerPrefab.setPosition(cc.v2(-30 + i * 30, 0));
            this.dipaiPanel.node.addChild(pokerPrefab);
        }
    },
    //新玩家加入桌子
    onPlayerEnterTable: function (data) {
        // 转换seatId
        this.createFace(data);
    },

    //其他玩家出牌时，显示其他玩家出的牌
    onOtherDiscard(data) {
        this._createHandedOutPoker(data);
        console.log("其他玩家出牌");
        g.handedoutPokers = { seatId: data["seatId"], pokers: data["pokers"] };
    },
    //其他玩家不要时
    onOtherPass(data) {
        console.log("其他玩都家不要");
        switch (data["seatId"]) {
            case 0:
                if (g.player.seatId === 1) {
                    cc.find("Canvas/controlPanel").active = true;
                    //不要的玩家显示“不要prefab”

                } else {
                }
                break;
            case 1:
                if (g.player.seatId === 0) {
                } else {
                    cc.find("Canvas/controlPanel").active = true;
                    //不要的玩家显示“不要prefab”

                }
                break;
            case 2:
                if (g.player.seatId === 0) {
                    cc.find("Canvas/controlPanel").active = true;
                    //不要的玩家显示“不要prefab”


                } else {
                }
                break;
        }

    },
    /**
     * 0表示自己节点坐标(-570,-250)
     * 1表示左边的玩家,节点坐标(-570,90)
     * 2表示右边的玩家,节点坐标(604,90)
     */
    _createSelfFace: function (seatId, name, coin) {
        var faceItem0 = cc.instantiate(this.facePrefab);
        faceItem0.getComponent('facecontroller').initFace(seatId, name, coin);
        this.faceNodes.selfFaceNode.addChild(faceItem0);
        faceItem0.setPosition(cc.v2(0, 0));
    },
    //创建新加入的玩家头像
    createFace: function (data) {
        this.faceNodes.getComponent("face_node")._initFace(data);
    },

    _testHandoutPoker: function () { },

    //发牌时创建手牌
    _createHandPoker: function (pokers) {
        console.log("开始发牌");
        var pokerPanel = this.pokerPanel.getComponent('poker_panel');
        pokerPanel._createPokers(pokers);
        if (pokers.length === 20) {
            this.status = true;
            this._setControlPanelVisible();
        }

    },
    //显示其他玩家出的牌
    _createHandedOutPoker: function (data) {
        console.log("座位号 "+ data['seatId'] + "得玩家出牌");
        this.handedOutPokerPanel = cc.find("Canvas/handedOutPokerPanel");
        var hop = this.handedOutPokerPanel.getComponent("handedout_poker_panel");
        hop._createHandedOutPoker(data);
    },
    hehe:function(data){
        this.win.play("win");
    }

});
