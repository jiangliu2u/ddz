const config = require('config');
const PokerPlay = require('PokerHandler');
const Util = require('Util');
cc.Class({
    extends: cc.Component,
    properties: {
        poker: {
            default: null,
            type: cc.Prefab
        },
        dipaiPanel: {
            default: null,
            type: cc.Layout
        },
        pokerPanel: {
            default: null,
            type: cc.Layout
        },
        faceNodes: {
            default: [],
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

        // test handout 
        // this._testHandoutPoker();
        var clock = cc.instantiate(this.clockPrefab);
        clock.setPosition(cc.p(0,0));
        clock.getComponent("clock").startCountdown(3);
        this.node.addChild(clock);

        this._createDipai([0x10, 0x4D, 0x5E]);
        return;

        this.controlPanel.active = false;
        this.targetList = null;
        // if (cc.sys.isNative) {
        //     io = SocketIO;
        // } else {
        //     io = require('socket.io');
        // }
        // this.io = io.connect('http://localhost:3001');
        var self = this;
        self.poker = null;
        g.io.on('start', function (data) {//所有玩家完成连接开始发牌
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
        g.io.on('your turn', function (data) {//轮到某个玩家出牌
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
        g.io.on("game over", function (data) {
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

    _createDipai: function() {
        
        var pokers = [0x10, 0x4D, 0x5E];

        for(var i = 0; i < pokers.length; i++) {
            var pokerPrefab = cc.instantiate(this.poker);
            var script = pokerPrefab.getComponent("poker");
            script.initPoker(pokers[i], 1);
            script.doDisable();
            pokerPrefab.setPosition(cc.p(-30 + i * 30, 0));
            this.dipaiPanel.node.addChild(pokerPrefab);
        }
    },

    _testCreateFaces: function() {
        this.onPlayerEnterRoom({ seatId: 0, name: 'zxf', coin: 1234 });
        this.onPlayerEnterRoom({ seatId: 1, name: 'zxf', coin: 444 });
        this.onPlayerEnterRoom({ seatId: 2, name: 'zxf', coin: 33 });
    },

    onPlayerEnterRoom: function(player) {
        var name = player.name;
        var coin = player.coin;
        var seatId = player.seatId;
        // 转换seatId
        this._createFace(seatId, name, coin);
    },

    /**
     * 0表示自己
     * 1表示左边的玩家
     * 2表示右边的玩家
     */
     _createFace: function(seatId,name, coin) {
        var face = cc.instantiate(this.facePrefab);
        face.getComponent('facecontroller').initFace("zxf", 12345, null);
        this.faceNodes[seatId].addChild(face);
    },

    _testHandoutPoker: function() {
        var data = [{ 'showTxt': 4, showType: 'spade' }, { 'showTxt': 4, showType: 'spade' }, { 'showTxt': 4, showType: 'spade' },
            { 'showTxt': 4, showType: 'spade' }, { 'showTxt': 4, showType: 'spade' }, { 'showTxt': 4, showType: 'spade' },
            { 'showTxt': 4, showType: 'spade' }, { 'showTxt': 4, showType: 'spade' }, { 'showTxt': 4, showType: 'spade' },
            { 'showTxt': 4, showType: 'spade' }, { 'showTxt': 4, showType: 'spade' }, { 'showTxt': 4, showType: 'spade' }];
        this._createHandPoker(data, this.pokerCard, this.pokerPanel);
    },

    //发牌
    startHandoutPoker: function () {
        var myPokerData = this.poker;
        var myPokerNode = [];
        var sceneWidth = cc.director.getWinSize().width;
        
        // this._createHandPoker(myPokerData, this.pokerCard, this.pokerPanel);
        // for (var i = 0; i < myPokerData.length; i++) {
        //     var cardNode = cc.instantiate(this.pokerCard);
        //     cardNode.parent = this.node;
        //     cardNode.scale = config.seatPos.center.pokerScale;
        //     var poker = cardNode.getComponent('PokerControl');
        //     poker.showPoker(myPokerData[i]);
        //     myPokerNode.push(cardNode);
        //     Util.neatenPoker(myPokerNode, config.seatPos.center, sceneWidth);
        // }
    },

    _createHandPoker: function (myPokerData, cardPrefab, parent) {
        var myPokerNode = [];
        var sceneWidth = cc.director.getWinSize().width;
        for (var i = 0; i < myPokerData.length; i++) {
            var cardNode = cc.instantiate(cardPrefab);
            parent.node.addChild(cardNode);
            cardNode.scale = config.seatPos.center.pokerScale;
            var poker = cardNode.getComponent('PokerControl');
            poker.showPoker(myPokerData[i]);
            myPokerNode.push(cardNode);
            cardNode.setPosition(cc.p(30 * i, 0));
            // Util.neatenPoker(myPokerNode, config.seatPos.center, sceneWidth);
        }
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
                console.log(name+"deleted")
            }
        }
    }

});
