const common = require("../common/_init");
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
        facePrefab: {
            default: null,
            type: cc.Prefab
        },
        clockPrefab: {
            default: null,
            type: cc.Prefab
        },
        passPrefb: {
            default: null,
            type: cc.Prefab
        },
        endDialog: {
            default: null,
            type: cc.Node
        },

        faces: {
            default: [],
            type: cc.Node
        },
        passNode: {
            default: null,
            type: cc.Node
        },

        prepareBtn: {
            default: null,
            type: cc.Node
        },

        call_landlord: {
            default: null,
            type: cc.Node
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.debug.setDisplayStats(false);
        console.log('on load');
        this.passNode = cc.find('Canvas/passTag');//动态挂载node
        this.passNode.addComponent('passTag');//动态添加显示玩家不出提示的脚本
        this.faceNodes = cc.find('Canvas/faceNode');
        this.faceNodes.addComponent('face_node');
        this.pokerPanel = cc.find('Canvas/pokerPanel');
        this.pokerPanel.addComponent('poker_panel');
        common.Protocol.init();
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_ENTER_TABLE, this.onEnterTable, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_NEW_PLAYER, this.onPlayerEnterTable, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_DEAL_POKER, this._createHandPoker, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_PASS, this.onOtherPass, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_START, this.onStart, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_CALL_LANDLORD, this.onOtherCallLandlord, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_NO_CALL_LANDLORD, this.onOtherNoCallLandlord, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_ROB_LANDLORD, this.onOtherRobLandlord, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_NO_ROB_LANDLORD, this.onOtherNoRobLandlord, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_DISCARD, this.onOtherDiscard, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_PLAYER_PREPARED, this.onOtherPrepared, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_PLAYER_LEAVE, this.onOtherLeave, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_GAME_OVER, this.endGame, this);
        this.faceNodes.getComponent("face_node").createSelf();
        g.player.team = 0;//加入桌子默认队伍为0
        this._setControlPanelVisible(this.status);
        this._createDipai([-1, -1, -1]);
        this.call_and_rob = this.call_landlord.getComponent("call_landlord");
        g.player.status = 1;
        g.game = this;

    },

    start: function () {
        //this.deletePokerNode('poker');
    },
    onDestroy() {
        console.log('destroy');
    },
    _updateDipai(pokers) {

    },

    _setControlPanelVisible(visable) {
        var cp = this.controlPanel.getComponent("control_panel");
        cp.setVisible(visable);
    },
    _createDipai: function (pokers) {
        if (this.dipaiPanel.children !== undefined) {
            for (var i = 0; i < this.dipaiPanel.children.length; i++) {
                if (this.dipaiPanel.children.name === "poker") {
                    this.dipaiPanel.children[i].destroy();
                    //todo 重置底牌不销毁对象，重复利用
                }
            }
        }
        for (var i = 0; i < pokers.length; i++) {
            var pokerPrefab = cc.instantiate(this.poker);
            var script = pokerPrefab.getComponent("poker");
            script.initPoker(pokers[i], 1);
            script.doDisable();
            pokerPrefab.setPosition(cc.v2(-30 + i * 30, 0));
            this.dipaiPanel.addChild(pokerPrefab);
        }
    },

    onPlayerEnterTable: function (data) {
        // 转换seatId
        console.log('new players');
        console.log(this);
        var fn = this.faceNodes.getComponent('face_node');
        if (g.getLeftPlayerSeatId(g.player.seatId) === data['seatId']) {
            fn._createLeft(data);
        } else {
            fn._createRight(data);
        }
    },

    //玩家加入桌子,显示已加入的玩家

    onEnterTable: function (data) {
        // 转换seatId
        console.log('enter table');
        var self = this;
        setTimeout(function () {
            self.createFace(data);
        }, 50);
    },
    createFace: function (data) {
        var fn = cc.find('Canvas/faceNode').getComponent('face_node');
        console.log('初始化其他玩家头像');
        fn._initFace(data);



    },
    //有玩家离开
    onOtherLeave(data) {
        if (data['seatId'] === g.getLeftPlayerSeatId) {
            this.faceNodes.getComponent("face_node").deleteLeftFace();
        }
        if (data['seatId'] === g.getRightPlayerSeatId) {
            this.faceNodes.getComponent("face_node").deleteRightFace();
        }
    },
    //其他玩家准备
    onOtherPrepared(data) {
        //todo
    },
    onStart(data) {
        this.call_and_rob.hideAll();
        var pokerPanel = this.pokerPanel.getComponent('poker_panel');
        //var fn = this.faceNodes.getComponent("face_node");
        var seatId = g.player.seatId;
        var landlord = data["landlord"];
        if (g.player.seatId === data["landlord"]) {
            this._setControlPanelVisible(true);
            g.player.team = 1;
            pokerPanel.addPokers(this.dipai);
        } else {
            g.player.team = 0;
        }
        this.faces[0].children[0].getComponent("facecontroller").changeFace(landlord === seatId);
        this.faces[1].children[0].getComponent("facecontroller").changeFace(landlord === g.getRightPlayerSeatId(seatId));
        this.faces[2].children[0].getComponent("facecontroller").changeFace(landlord === g.getLeftPlayerSeatId(seatId));
        this._createDipai(this.dipai);
    },
    onOtherCallLandlord(data) {
        if (data['toshow'] === g.player.seatId) {
            this.call_and_rob.showRobBtn();
        }
        if (g.getLeftPlayerSeatId(g.player.seatId) === data['seatId']) {
            this.call_and_rob.showOtherCall(1);
            console.log('左边');
        } else {
            this.call_and_rob.showOtherCall(0);
            console.log('右边');
        }
    },
    onOtherNoCallLandlord(data) {
        if (data['toshow'] === g.player.seatId) {
            this.call_and_rob.showRobBtn();
        }
        if (g.getLeftPlayerSeatId(g.player.seatId) === data['seatId']) {

            this.call_and_rob.showOtherNoCall(1);
        } else {
            this.call_and_rob.showOtherNoCall(0);
        }
    },
    onOtherRobLandlord(data) {
        if (data['toshow'] === g.player.seatId) {
            this.call_and_rob.showRobBtn();
        }
        if (g.getLeftPlayerSeatId(g.player.seatId) === data['seatId']) {
            var msg = {
                cmd: 'no_rob_landlord',
                playerId: g.player.id
            }
            g.player.sendMsg(common.EventType.MSG_DDZ_NO_ROB_LANDLORD, msg);
            this.call_and_rob.showOtherRob(1);
        } else {
            this.call_and_rob.showOtherRob(0);
        }
    },
    onOtherNoRobLandlord(data) {
        if (data['toshow'] === g.player.seatId) {
            this.call_and_rob.showRobBtn();
        }
        if (g.getLeftPlayerSeatId(g.player.seatId) === data['seatId']) {

            this.call_and_rob.showOtherNoRob(1);
        } else {
            this.call_and_rob.showOtherNoRob(0);
        }
    },


    //其他玩家出牌时，显示其他玩家出的牌
    onOtherDiscard(data) {
        this._createHandedOutPoker(data);
        var pt = cc.find("Canvas/passTag").getComponent("passTag");
        g.handedoutPokers = { seatId: data["seatId"], pokers: data["pokers"] };
        if (g.getLeftPlayerSeatId(g.player.seatId) === data['seatId']) {
            pt.hideLeftPass();
        } else {
            pt.hideRightPass();
        }
    },
    //其他玩家不要时
    onOtherPass(data) {
        //显示出牌控制按钮
        var cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
        var p = cc.find("Canvas/passTag");
        var pt = p.getComponent("passTag");
        if (g.getLeftPlayerSeatId(g.player.seatId) === data['seatId']) {
            console.log("左边玩家不要");
            pt.hideSelfPass();
            // pat.hideLeftTimer();
            pt.showLeftPass();
            cp.setVisible(true);
            //todo 直接不要，记得删除
            setTimeout(function () {
                cp.pass();
            }, 50);
            console.log("删除该不要的玩家出的牌，并左边显示不要");
        } else {
            console.log("右边玩家不要");
            // pat.hideRightTimer();
            // pat.leftTimer();
            pt.showRightPass();
            console.log("删除该不要的玩家出的牌，并右边显示不要");

        }
    },
    /**
     * 0表示自己节点坐标(-570,-250)
     * 1表示左边的玩家,节点坐标(-570,90)
     * 2表示右边的玩家,节点坐标(604,90)
     */

    //创建新加入的玩家头像



    _testHandoutPoker: function () { },

    //发牌时创建手牌
    _createHandPoker: function (data) {

        console.log("开始发牌");
        console.log(data);
        var pokerPanel = this.pokerPanel.getComponent('poker_panel');
        pokerPanel._createPokers(data["pokers"]);
        this.dipai = data['dipai'];
        if (data['startP'] === g.player.seatId) {
            cc.find('Canvas/callLandlord').getComponent("call_landlord").showCallBtn();
        }

    },
    //显示其他玩家出的牌
    _createHandedOutPoker: function (data) {
        console.log("座位号 " + data['seatId'] + "得玩家出牌");
        this.handedOutPokerPanel = cc.find("Canvas/handedOutPokerPanel");
        var hop = this.handedOutPokerPanel.getComponent("handedout_poker_panel");
        hop._createHandedOutPoker(data);

    },
    showPass(loc) {
        this.handedOutPokerPanel = cc.find("Canvas/handedOutPokerPanel");
        var hop = this.handedOutPokerPanel.getComponent("handedout_poker_panel");
        switch (loc) {
            case "left":
                break;
            case "right":
        }
    },
    zhunbei: function () {
        console.log("prepare clicked");
        g.player.sendMsg(common.EventType.MSG_DDZ_PLAYER_PREPARED, { cmd: "prepare", playerId: g.player.id });
        this.prepareBtn.active = false;
    },
    endGame: function (data) {
        console.log(data);
        var end = this.endDialog.getComponent("end_dialog");
        if (data["team"] === g.player.team) {
            end.show(true, true);
            console.log("赢了");
        } else {
            console.log("输了");
            end.show(true, false);
        }
        console.log("end game");
        var hop = cc.find("Canvas/handedOutPokerPanel").getComponent("handedout_poker_panel");
        hop.deleteAll();//删除所有出的牌
        var pt = cc.find("Canvas/passTag").getComponent("passTag");
        pt.hidePasses();//隐藏不要
        g.handedoutPokers = { seatId: g.player.seatId, pokers: [] };//把出过的牌池设置为空
        var pokerPanel = this.pokerPanel.getComponent('poker_panel');
        pokerPanel._deletePokers();
        console.log(g.player.team);
        g.player.team = 0;
    },
    onDestroy(){
        //解绑
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_ENTER_TABLE, this.onEnterTable, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_NEW_PLAYER, this.onPlayerEnterTable, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_DEAL_POKER, this._createHandPoker, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_PASS, this.onOtherPass, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_START, this.onStart, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_CALL_LANDLORD, this.onOtherCallLandlord, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_NO_CALL_LANDLORD, this.onOtherNoCallLandlord, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_ROB_LANDLORD, this.onOtherRobLandlord, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_NO_ROB_LANDLORD, this.onOtherNoRobLandlord, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_DISCARD, this.onOtherDiscard, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_PLAYER_PREPARED, this.onOtherPrepared, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_PLAYER_LEAVE, this.onOtherLeave, this);
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_GAME_OVER, this.endGame, this);
    },

});
