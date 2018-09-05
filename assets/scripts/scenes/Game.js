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
        win: {
            default: null,
            type: cc.Animation
        },
        lose: {
            default: null,
            type: cc.Animation
        },
        faces:{
            default:[],
            type:cc.Node
        },
        prepareBtn: {
            default: null,
            type: cc.Node
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
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_PLAYER_PREPARED, this.onOtherPrepared, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_PLAYER_LEAVE, this.onOtherLeave, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_GAME_OVER, this.endGame, this);
        this.faceNodes.getComponent("face_node").createSelf({d:1});
        g.player.team = 0;//加入桌子默认队伍为0
        this._setControlPanelVisible(this.status);
        this._createDipai([-1,-1,-1]);
        g.test = this;

    },

    start: function () {
        //this.deletePokerNode('poker');
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

    //新玩家加入桌子
    onPlayerEnterTable: function (data) {
        // 转换seatId
        this.createFace(data);
    },
    //有玩家离开
    onOtherLeave(data){
        if(data['seatId']===g.getLeftPlayerSeatId){
            this.faceNodes.getComponent("face_node").deleteLeftFace();
        }
        if (data['seatId'] === g.getRightPlayerSeatId) {
            this.faceNodes.getComponent("face_node").deleteRightFace();
        }
    },
    //其他玩家准备
    onOtherPrepared(data){
        //todo
    },
    //其他玩家出牌时，显示其他玩家出的牌
    onOtherDiscard(data) {
        this._createHandedOutPoker(data);
        g.handedoutPokers = { seatId: data["seatId"], pokers: data["pokers"] };
    },
    //其他玩家不要时
    onOtherPass(data) {
        //显示出牌控制按钮
        let cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
        var pat = cc.find("Canvas/passAndTimer").getComponent("pass_and_timer");
        switch (data["seatId"]) {
            case 0:
                if (g.player.seatId === 1) {
                    console.log("左边玩家不要");
                    pat.hideSelfPass();
                    pat.hideLeftTimer();
                    pat.leftPass();
                    cp.setVisible(true);
                    console.log("删除该不要的玩家出的牌，并左边显示不要");
                } else {
                    console.log("右边玩家不要");
                    pat.hideRightTimer();
                    pat.leftTimer();
                    pat.rightPass();
                    console.log("删除该不要的玩家出的牌，并右边显示不要");
                }
                break;
            case 1:
                if (g.player.seatId === 0) {
                    pat.hideRightTimer();
                    pat.rightPass();
                    console.log("右边玩家不要");
                    pat.leftTimer();
                    console.log("删除该不要的玩家出的牌，并右边显示不要");
                } else {
                    cp.setVisible(true);
                    pat.hideLeftTimer();
                    pat.leftPass();
                    console.log("左边玩家不要");
                    pat.hideSelfPass();
                    console.log("删除该不要的玩家出的牌，并左边显示不要");
                }
                break;
            case 2:
                if (g.player.seatId === 0) {
                    pat.hideLeftTimer();
                    pat.leftPass();
                    console.log("左边玩家不要");
                    cp.setVisible(true);
                    pat.hideSelfPass();
                    console.log("删除该不要的玩家出的牌，并左边显示不要");

                } else {
                    pat.hideRightTimer();
                    pat.rightPass();
                    console.log("右边玩家不要");
                    pat.leftTimer();
                    console.log("删除该不要的玩家出的牌，并右边显示不要")

                }
                break;
        }
    },
    /**
     * 0表示自己节点坐标(-570,-250)
     * 1表示左边的玩家,节点坐标(-570,90)
     * 2表示右边的玩家,节点坐标(604,90)
     */
    _createSelfFace: function (name, coin, num) {
        var faceItem0 = cc.instantiate(this.facePrefab);
        faceItem0.getComponent('facecontroller').initFace(name, coin, num);
        this.faceNodes.selfFaceNode.addChild(faceItem0);
        faceItem0.setPosition(cc.v2(0, 0));
    },
    //创建新加入的玩家头像
    createFace: function (data) {
        this.faceNodes.getComponent("face_node")._initFace(data);
    },


    _testHandoutPoker: function () { },

    //发牌时创建手牌
    _createHandPoker: function (data) {

        console.log("开始发牌");
        var pokerPanel = this.pokerPanel.getComponent('poker_panel');
        var fn = this.faceNodes.getComponent("face_node");

        var seatId = g.player.seatId;
        var landlord = data["landlord"];
        if(g.player.seatId===data["landlord"]){
            pokerPanel._createPokers(data["pokers"].concat(data["dipai"]));
            this._setControlPanelVisible(true);
            g.player.team = 1;
        } else {
            pokerPanel._createPokers(data["pokers"]);
        }
        
        this.faces[0].children[0].getComponent("facecontroller").changeFace(landlord === seatId);
        this.faces[1].children[0].getComponent("facecontroller").changeFace(landlord === g.getRightPlayerSeatId(seatId));
        this.faces[2].children[0].getComponent("facecontroller").changeFace(landlord === g.getLeftPlayerSeatId(seatId));
        this._createDipai(data["dipai"]);


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
        this.prepareBtn.active=false;
    },
    endGame: function (data) {

        var hop = cc.find("Canvas/handedOutPokerPanel").getComponent("handedout_poker_panel");
        hop.deleteAll();//删除所有出的牌
        var a = this.controlPanel.getComponent("control_panel");
        a.setVisible(false);//隐藏出牌按钮
        var pt = cc.find("Canvas/passAndTimer").getComponent("pass_and_timer");
        pt.hideAll();//隐藏计时器和不要
        console.log(data);
        g.handedoutPokers = { seatId: 0, pokers: [] };//把出过的牌池设置为空
        var pokerPanel = this.pokerPanel.getComponent('poker_panel');
        pokerPanel._deletePokers();
        console.log(g.player.team);
        if (data["team"] === g.player.team) {
            this.win.play();
        } else {
            this.lose.play();
        }
    }

});
