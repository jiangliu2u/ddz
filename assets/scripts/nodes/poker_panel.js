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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.pokers = [];
        var self = this;
        var node = this.node;
        this._startPos = 0;
        g.pN = this;
        // globa.eventmanager.addlisnter(global.EventType.EVENT_DISCARD, this._onDiscard, this);

        // 手牌点击事件监听
        node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart);
        node.on(cc.Node.EventType.TOUCH_END, function(event) {
             self.onTouchEnd(event);
         });
    },

    onTouchStart: function (event) {
        var pos = event.getLocation();
        var target = event.getCurrentTarget();
        var localPos = target.convertToNodeSpace(pos);
        this._startPos = localPos;
        console.log("TOUCH_START localPos.x: " + localPos.x + ",localPos.y: " + localPos.y);
    },

    onTouchEnd: function (event) {
        var pos = event.getLocation();
        var target = event.getCurrentTarget();
        var endPos = target.convertToNodeSpace(pos);

        // delta 如果是正的，说明是右往左
        // delta 如果是负的，说明是左往右
        console.log(this);
        console.log("TOUCH_END endPos.x: " + endPos.x + ",endPos.y: " + endPos.y);
        target.getComponent('pokerPanel')._calcTouchedPokers(this._startPos, endPos);
        
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
        return (this.pokers.length - 1) * this._MARGIN + this._WIDTH;
    },

    _calcTouchedPokers: function (startX, endX) {
        var rightPos = this._calcPokerArea();
        var leftPos = -rightPos;
        if (startX > rightPos && endX > rightPos || startX < leftPos && endX < leftPos) {
            return [];
        }
        /**
         * 最右侧的边缘坐标和选中区域右坐标选较小值
         * 最左侧的边缘坐标和选中区域左坐标选较大值
         */
        var rightX = Math.max(startX, endX);
        var leftX = Math.min(startX, endX);
        var realRX = Math.min(rightX, rightPos);
        var realLX = Math.max(leftX, leftPos);

        var leftIndex = Math.floor((realLX - leftPos) / this._MARGIN);
        var rightIndex = Math.floor((realRX - leftPos) / this._MARGIN);
        console.log("leftIndex:" + leftIndex + " rightIndex:" + rightIndex);


    },

    start() {

    },

    // update (dt) {},


    /**
     * 出牌事件，参数是出去的牌
     */
    _onDiscard: function (pokers) {
        console.log(pokers);
        var pat = cc.find("Canvas/passAndTimer").getComponent("pass_and_timer");
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
        this._neatenPokers(this.pokers);
        //删除右边玩家之前出的牌并显示倒计时
        hop.hideRight();
        pat.rightTimer();
        g.player.sendMsg(common.EventType.MSG_DDZ_DISCARD, msg);
        if (this.pokers.length === 0) {
            g.player.sendMsg(common.EventType.MSG_DDZ_GAME_OVER, { cmd: "gameover", playerId: g.player.id });
            var hop = cc.find("Canvas/handedOutPokerPanel").getComponent("handedout_poker_panel");
            hop.deleteAll();//删除所有出的牌
            var a = cc.find("Canvas/controlPanel").getComponent("control_panel");
            a.setVisible(false);//隐藏出牌按钮
            var pt = cc.find("Canvas/passAndTimer").getComponent("pass_and_timer");
            pt.hideAll();//隐藏计时器和不要
            var ga = cc.find("Canvas").getComponent("Game");
            ga.win.play();
            // var pokerPanel = cc.find("Canvas/pokerPanel").getComponent('poker_panel');
            // pokerPanel._deletePokers();
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
        console.log(this.children);
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
