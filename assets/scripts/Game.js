const config = require('config');
const PokerPlay = require('poker_handler');
const Util = require('util');
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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        common.EventDispatcher.listen(common.EventType.MSG_DDZ_ENTER_TABLE, this.createFace, this);
        
        // common.EventDispatcher.listen(common.EventType.MSG_DDZ_YOUR_TURN, this._createHandedOutPoker, this);
        //以下加入房间，桌子id设置为1，后续可根据点击的桌子id进入指定房间
        g.player.sendMsg(common.EventType.MSG_DDZ_ENTER_TABLE, { cmd: "join", tableId: 1, player: g.player.id });
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_CHUPAI, this._createHandedOutPoker, this);
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_DEAL_POKER, this._createHandPoker, this);
        this._setControlPanelVisible(false);
        common.Protocol.init();
        return;

        this.targetList = null;
        // if (cc.sys.isNative) {
        //     io = SocketIO;
        // } else {
        //     io = require('socket.io');
        // }
        // this.io = io.connect('http://localhost:3001');
        var self = this;
        self.poker = null;
        g.player.on('start', function (data) {//所有玩家完成连接开始发牌
            self.deletePokerNode('poker');
            self.deletePokerNode('targetPoker');
            self.poker = data['poker'];
            console.log(self.poker);
            self.status = data['status'];
            if (self.status) {
                self.controlPanel.active = true;
            }
            self.team = data['team'];
            self.startHandoutPoker();
        });
        g.player.on('your turn', function (data) {//轮到某个玩家出牌
            if (this.id === data['id']) {
                if (this.id === data['tid']) {
                    self.status = true;
                    self.targetList = null;
                    console.log('别人都不要，该你出牌了');
                    self.dontfollow = false;
                    self.controlPanel.active = true;


                } else {
                    self.status = true;
                    self.targetList = data['list'];
                    console.log('该你出牌了');
                    self.dontfollow = true;
                    self.controlPanel.active = true;

                }
            } else {
                self.status = false;
                self.targetList = data['list'];
                self.dontfollow = false;
                self.controlPanel.active = false;

            }
            if (self.targetList) {
                console.log("显示出的牌");
                self.showTargetPoker(self.targetList);
            }

        });
        g.player.on("game over", function (data) {
            self.controlPanel.active = false;
            self.deletePokerNode('poker');
            self.deletePokerNode('targetPoker');
            console.log(self.node.children);
            if (self.team == data['win_team']) {
                self.win.play('win');
                console.log("你赢了");
            } else {
                console.log("你输了");
                self.lose.play('lose');

            }
        });

    },

    start: function () {
        //this.deletePokerNode('poker');
    },
    _updateDipai(pokers) {

    },
    _setControlPanelVisible(show) {
        this.controlPanel.active = show;
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

    onPlayerEnterRoom: function (player) {
        var name = player.name;
        var coin = player.coin;
        var seatId = player.seatId;
        // 转换seatId
        this._createFace(seatId, name, coin);
    },

    /**
     * 0表示自己节点坐标(-570,-250)
     * 1表示左边的玩家,节点坐标(-570,90)
     * 2表示右边的玩家,节点坐标(604,90)
     */
    _createFace: function (seatId, name, coin) {
        var face = cc.instantiate(this.facePrefab);
        face.getComponent('facecontroller').initFace("zxf", 12345, null);
        var faces = this.faceNodes.children;
        faces[seatId].addChild(face);
    },
    createFace: function (data) {
        console.log('create face');
        // console.log(data);
        this.faceNodes.getComponent("face_node")._initFace(data);
    },

    _testHandoutPoker: function () { },
    //创建手牌
    _createHandPoker: function (pokers) {
        var pokerPanel = this.pokerPanel.getComponent('poker_panel');
        pokerPanel._createPokers(pokers);
        if (pokers.length === 20) {
            this._setControlPanelVisible(true);
        }

    },
    //显示玩家出的牌
    _createHandedOutPoker: function (data) {
        console.log(data['index']+"出牌");
        this.handedOutPokerPanel = cc.find("Canvas/handedOutPokerPanel");
        var hop = this.handedOutPokerPanel.getComponent("handedout_poker_panel");
        hop._createHandedOutPoker(data['pokers'],data['index']);
    },

    //获取选中的牌，不符合规定的牌型则无返回值
    getSelectedPoker: function () {
        var all = this.node.children;
        var allPoker = [];
        var playList = [];
        var pokerToDel = [];
        for (var i = 0; i < all.length; i++) {
            if (all[i]._name === 'poker') {
                allPoker.push(all[i]);
            }
        }
        for (var i = 0; i < allPoker.length; i++) {
            if (allPoker[i].getComponent('PokerControl').selected) {
                playList.push({
                    'showTxt': allPoker[i].getComponent("PokerControl").cardData['showTxt'],
                    'showType': allPoker[i].getComponent("PokerControl").cardData['showType']
                });
                pokerToDel.push(allPoker[i]);
            }

        }
        console.log("get selected Poker" + JSON.stringify(playList));
        var pokerplay = new PokerPlay();//处理要出的牌
        var pl_wrapper = pokerplay.getPokerWrapper(playList);

        if ((pl_wrapper && !this.targetList) || (this.targetList && pl_wrapper.follow(this.targetList))) {//符合牌型才会出牌
            for (var i = 0; i < pokerToDel.length; i++) {
                for (var j = 0; j < allPoker.length; j++) {
                    if (allPoker[j].__instanceId == pokerToDel[i].__instanceId) {
                        allPoker.splice(j, 1);
                    }
                }
                var sceneWidth = cc.director.getWinSize().width;
                Util.neatenPoker(allPoker, config.seatPos.center, sceneWidth);
                pokerToDel[i].destroy();
            }
            return playList;//出牌的内容[{showTxt:数值，showType:花色}]}
        } else {
            throw "牌型错误或者不能跟牌";
        }
    },
    //在游戏场景显示玩家出的一手牌
    showTargetPoker(targetList) {
        this.deletePokerNode('targetPoker');
        var tp = targetList;
        var tpNode = [];
        var sceneWidth = cc.director.getWinSize().width;
        var scene = cc.director.getScene("Game");
        for (var i = 0; i < tp.length; i++) {
            var cardNode = cc.instantiate(this.pokerCard);
            cardNode._name = "targetPoker";
            cardNode.parent = this.node;
            cardNode.scale = config.seatPos.center.pokerScale;
            var poker = cardNode.getComponent('PokerControl');
            poker.showPoker(tp[i]);
            tpNode.push(cardNode);
            Util.neatenPoker(tpNode, config.seatPos.playedPoker, sceneWidth);
        }
    },
    deletePokerNode: function (name) {
        for (var i = 0; i < this.node.children.length; i++) {//删除刷新前的牌
            if (this.node.children[i]._name === name) {
                this.node.children[i].destroy();
                console.log(name + "deleted")
            }
        }
    }

});
