cc.Class({
    extends: cc.Component,


    properties: {
        _WIDTH: {
            default: 0
        },
        _SPEED: {
            default: 0.03,
            type: cc.Float
        },
        unusedLabelPool: {
            default: []
        },
        usedLabelPool: {
            default: []
        },
        currentLabelPool: {
            default: []
        },
        noticePool: {
            default: []
        },
        massageLabel: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.unusedLabelPool = [];
        this.usedLabelPool = [];
        this.currentLabelPool = [];
        this._WIDTH = 600;

        var self = this;
        window.testPushNotice = function (msg) {
            self._pushNotice(msg);
        };
        window.testtest = function () {
            self._test();
        };
        this.startAni("cadasd")
    },
    startAni: function (cb) {
        var self = this;
        var node = this.massageLabel;
        var time = 5;
        var startX = node.x;
        var startY = node.y;
        if (node.width > 500) {
            time = node.width / 100;
        }
        var ac_0 = cc.delayTime(0.01);
        var ac_1 = cc.moveBy(time, cc.v2(-1140, 0));
        var ac_2 = cc.callFunc(function () {
            // cb()
            node.setPosition(cc.v2(startX, startY))
        })
        var ac = cc.sequence(ac_0, ac_1, ac_2);
        var action = ac.repeatForever();//重复执行

        // action.repeat(5);//执行次数
        // cc.sequence    --> 动作序列，有序地一个一个执行动作
        // repeatForever  --> 重复执行动作
        // cc.spawn       --> 同时执行动作
        node.runAction(action);
    },
    _test: function () {
        var msg = '<color=#00ff00>love</color><color=#ff0000> cocos';
        for (var i = 0; i < 10; i++) {
            var tmp = msg + i + '---</color>';
            this._pushNotice(tmp);
        }
    },

    start() {

    },

    _getOneLabel: function () {
        var lbl;
        if (this.unusedLabelPool.length > 0) {
            lbl = this.unusedLabelPool.pop();
        } else {
            var tag = this.unusedLabelPool.length + this.usedLabelPool.length;
            var node = new cc.Node('zoumading' + tag);
            var lbl = node.addComponent(cc.RichText);
            this.node.addChild(node);
        }
        this.usedLabelPool.push(lbl);

        return lbl;
    },

    _releaseOneLabel: function (lbl) {
        var idx = this.usedLabelPool.indexOf(lbl);
        if (idx != -1) {
            this.usedLabelPool.splice(idx, 1);
            this.unusedLabelPool.push(lbl);
            lbl.node.visible = false;
        }
    },

    _pushNotice: function (msg) {
        this.noticePool.push(msg);
    },

    _getNotice: function () {
        return this.noticePool.pop();
    },

    update(dt) { }

});
