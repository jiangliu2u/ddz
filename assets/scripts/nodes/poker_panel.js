var common = require("../common/_init");
/**
 * poker的大小是this._WIDTHX184
 * 两张poker的间距是this._MARGIN
 * 所有的poker都向间靠齐。
 * panel的宽度是 19xthis._MARGIN + this._WIDTH = 1052
 *      的高度是 184
 * 
 * todo
 * 以后可以根据牌的数量动态计算间距，排版
 */
cc.Class({
    extends: cc.Component,

    properties: {
        _MARGIN: 48,
        _WIDTH: 140,
        _HEIGHT: 184,

        poker: {
            default: null,
            type: cc.Prefab
        },
        altas: {
            default: null,
            type: cc.SpriteAtlas
        },
        pokers: {
            default: [],
            type: cc.Node
        },
        selectedPokers: {
            default: [],
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        var node = this.node;
        this._startPos = 0;
        g.pN = this;
        // globa.eventmanager.addlisnter(global.EventType.EVENT_DISCARD, this._onDiscard, this);

        // 手牌点击事件监听
        //node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart.bind(this));
        node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.onTouchStart(event);
        });
        node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.onTouchEnd(event);
        });
        // node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
        //     this.onTouchMove(event);
        // });

        g.addTestPokers = () => {
            this._createPokers([0x11, 0x12, 0x34, 0x11, 0x11, 0x11, , 0x34]);
        }
    },
    onTouchMove(event) {
        var pos = event.getLocation();
        var target = event.getCurrentTarget();
        var localPos = target.convertToNodeSpaceAR(pos);
        console.log(event.getDelta().x);
        var pPos = this._calcPokerArea();
        if (event.getDelta().x >= this._MARGIN) {
            var index = Math.floor((localPos.x - pPos.leftPos) / this._MARGIN);
            console.log(index);
            this.addPokerToSelected(this.pokers[index]);
        }

    },

    onTouchStart: function (event) {
        var pos = event.getLocation();
        var target = event.getCurrentTarget();
        var localPos = target.convertToNodeSpaceAR(pos);
        this._startPos = localPos;
        var boudingBox = this.node.getBoundingBox();
    },

    onTouchEnd: function (event) {
        var pos = event.getLocation();
        var target = event.getCurrentTarget();
        var endPos = target.convertToNodeSpaceAR(pos);

        // delta 如果是正的，说明是右往左
        // delta 如果是负的，说明是左往右
        this._calcTouchedPokers(this._startPos, endPos);

    },
    addPokerToSelected(poker) {
        poker.getComponent("poker").select();
        this.selectedPokers.push(poker);
    },

    getSelectedPokers: function () {
        var pokers = this.pokers;
        var len = pokers.length;
        if (len === 0) {
            return [];
        }
        var selectedPokers = [];
        for (var i = 0; i < len; i++) {
            var poker = this.pokers[i];

            if (poker.getComponent('poker').selected) {
                selectedPokers.push(poker);
            }
        }
        return selectedPokers;
    },

    /**
     * 计算出剩余扑克的所在的区域
     */
    _calcPokerArea: function () {
        return { leftPos: this.pokers[0].x - this._WIDTH / 2, rightPos: this.pokers[this.pokers.length - 1].x + this._WIDTH / 2 };
    },

    _calcTouchedPokers: function (startX, endX) {
        var Pos = this._calcPokerArea();
        var leftPos = Pos.leftPos;
        var rightPos = Pos.rightPos;
        if (startX.x > rightPos && endX.x > rightPos || startX.x < leftPos && endX.x < leftPos) {
            return [];
        }
        /**
         * 最右侧的边缘坐标和选中区域右坐标选较小值
         * 最左侧的边缘坐标和选中区域左坐标选较大值
         */
        var rightX = Math.max(startX.x, endX.x);
        var leftX = Math.min(startX.x, endX.x);
        var realRX = Math.min(rightX, rightPos);
        var realLX = Math.max(leftX, leftPos);
        console.log(this._MARGIN);
        var leftIndex = Math.floor((realLX - leftPos) / this._MARGIN);
        var rightIndex = Math.floor((realRX - leftPos) / this._MARGIN);
        console.log("leftIndex:" + leftIndex + " rightIndex:" + rightIndex);
        for (let i = leftIndex; i <= rightIndex; i++) {
            var _poker = this.pokers[i];
            if (_poker) {
                _poker.getComponent("poker").select();
            }
            else {
                // console.error("计算错误" + i);
            }
        }

    },
    resetPokers() {
        for (let i = 0; i < this.pokers.length; i++) {
            if (this.pokers[i].getComponent("poker").selected) {
                this.pokers[i].getComponent("poker").deSelect();
            }
        }
    },

    start() {

    },

    // update (dt) {},


    /**
     * 出牌事件，参数是出去的牌
     * @param pokers 要出的牌
     */
    _onDiscard: function (pokers) {
        var pokersToDel = [];
        var hop = cc.find("Canvas/handedOutPokerPanel").getComponent("handedout_poker_panel");
        for (var i = 0, len = pokers.length; i < len; i++) {
            for (var j = 0; j < this.pokers.length; j++) {
                if (pokers[i]._id === this.pokers[j]._id) {
                    pokersToDel.push(this.pokers[j]);
                    this.pokers.splice(j, 1);
                }
            }
        }
        var pInfo = [];
        for (var i = 0; i < pokersToDel.length; i++) {
            pInfo.push(pokersToDel[i].getComponent("poker").value);
            pokersToDel[i].destroy();
        }
        var msg = {
            cmd: "discard",
            playerId: g.player.id,
            pokers: pInfo
        };
        g.handedoutPokers = { seatId: g.player.seatId, pokers: pInfo };
        if (this.pokers.length === 0) {
            g.player.sendMsg(common.EventType.MSG_DDZ_GAME_OVER, { cmd: "gameover", playerId: g.player.id });
            var hop = cc.find("Canvas/handedOutPokerPanel").getComponent("handedout_poker_panel");
            hop.deleteAll();//删除所有出的牌
            var a = cc.find("Canvas/controlPanel").getComponent("control_panel");
            a.setVisible(false);//隐藏出牌按钮
            var pt = cc.find("Canvas/passTag").getComponent("passTag");
            pt.hidePasses();//隐藏不要
            var pokerPanel = cc.find("Canvas/pokerPanel").getComponent('poker_panel');
            pokerPanel._deletePokers();//删除出的手牌
            var end = cc.find("Canvas/endDialog").getComponent("end_dialog");
            end.show(true, true);
            g.player.team = 0;
        } else {
            g.player.sendMsg(common.EventType.MSG_DDZ_DISCARD, msg);
            //删除右边玩家之前出的牌并显示倒计时
            hop.hideRight();
            this._neatenPokers(this.pokers);

        }



    },

    autoDiscard: function () {
        var pokersToDel = [];

        var hop = cc.find("Canvas/handedOutPokerPanel").getComponent("handedout_poker_panel");
        cc.find("Canvas/controlPanel").getComponent("control_panel").setVisible(false);
        pokersToDel.push(this.pokers[this.pokers.length - 1]);
        this.pokers.splice(this.pokers.length - 1, 1);
        var pInfo = [];
        for (var i = 0; i < pokersToDel.length; i++) {
            pInfo.push(pokersToDel[i].getComponent("poker").value);
            pokersToDel[i].destroy();
        }
        cc.find("Canvas/controlPanel").getComponent("control_panel").showSelfHandeOutPoker(pInfo);
        var msg = {
            cmd: "discard",
            playerId: g.player.id,
            pokers: pInfo
        };
        g.handedoutPokers = { seatId: g.player.seatId, pokers: pInfo };
        if (this.pokers.length === 0) {
            g.player.sendMsg(common.EventType.MSG_DDZ_GAME_OVER, { cmd: "gameover", playerId: g.player.id });
            var hop = cc.find("Canvas/handedOutPokerPanel").getComponent("handedout_poker_panel");
            hop.deleteAll();//删除所有出的牌
            var a = cc.find("Canvas/controlPanel").getComponent("control_panel");
            a.setVisible(false);//隐藏出牌按钮
            var pt = cc.find("Canvas/passTag").getComponent("passTag");
            pt.hidePasses();//隐藏不要
            var pokerPanel = cc.find("Canvas/pokerPanel").getComponent('poker_panel');
            pokerPanel._deletePokers();//删除出的手牌
            var end = cc.find("Canvas/endDialog").getComponent("end_dialog");
            end.show(true, true);
            g.player.team = 0;
        } else {
            g.player.sendMsg(common.EventType.MSG_DDZ_DISCARD, msg);
            //删除右边玩家之前出的牌并显示倒计时
            hop.hideRight();
            this._neatenPokers(this.pokers);

        }



    },
    _onPass() {
        g.player.sendMsg(common.EventType.MSG_DDZ_PASS, { cmd: "pass", playerId: g.player.id });
    },
    //发牌时显示手牌
    _createPokers: function (pokers) {
        var len = pokers.length;
        var totalWidth = (len - 1) * this._MARGIN + this._WIDTH;
        var startPos = -totalWidth / 2;
        for (var i = 0; i < len; i++) {
            var pokerPrefab = cc.instantiate(this.poker);
            var script = pokerPrefab.getComponent("poker");
            script.initPoker(pokers[i]);
            pokerPrefab._name = pokers[i] + "";
            pokerPrefab.setPosition(cc.v2(startPos + i * this._MARGIN, 0));
            this.node.addChild(pokerPrefab);
            this.pokers.push(pokerPrefab);
        }
        this._neatenPokers(this.pokers);
    },
    addPokers(pokers) {
        for (var i = 0, len = pokers.length; i < len; i++) {
            var pokerPrefab = cc.instantiate(this.poker);
            var script = pokerPrefab.getComponent("poker");
            script.initPoker(pokers[i]);
            pokerPrefab._name = pokers[i] + "";
            pokerPrefab.setPosition(cc.v2(0, 0));
            this.node.addChild(pokerPrefab);
            this.pokers.push(pokerPrefab);
        }
        this._neatenPokers(this.pokers);
    },
    //整理牌
    _neatenPokers: function (pokers) {
        var len = pokers.length;
        var totalWidth = (len - 1) * this._MARGIN + this._WIDTH;
        var startPos = -totalWidth / 2;
        for (var i = 0; i < pokers.length; i++) {
            pokers[i].setPosition(cc.v2(startPos + i * this._MARGIN, 0));
        }
    },
    _deletePokers: function () {
        //删除所有扑克
        console.log('结束删除所有扑克');
        this.pokers = [];
        if (this.node.children !== undefined) {
            if (this.node.children.length !== 0) {
                var all = this.node.children;
                for (var i = 0, len = all.length; i < len; i++) {
                    all[i].destroy();
                }
            }
        }
    },


    /**
     * 1. 自动提牌的功能
     * 2. 动态排版的功能
     */
});
let test;
(function (test) {
    test.bind = function (pokerPanel) {
        // 在pokerPanel中调用这个方法绑定已下 test.bind(this);
        test.pokerPanel = pokerPanel;
    };
    test.discard = function (pokers) {
        // 直接调用这个pokerPanel的出牌方法。这样在console里面就可以测试你的UI表现了。写法比较随意
        test.pokerPanel.discard(pokers);
    }
    test.discard1 = function (msg) {
        // 或者在这里trigger一个消息   
        // 这种方式是模拟服务器的消息。所以更好点。
        if (msg === undfined || msg === null) {
            msg = {
                'cmd': 'discard',
                'pokers': [0x13, 0x13]
            };
        }

        EventDispatcher.trigger('这里是出牌时间对应的事件类型', msg);
    }
})(test || (test = {}));
