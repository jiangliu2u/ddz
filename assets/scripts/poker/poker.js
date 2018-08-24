cc.Class({
    extends: cc.Component,

    /**
     * 扑克牌单件 cc.Prefab poker
     * 
     * 数据结构：
     * 一个byte标识一张poker
     * 高4位表示花色  0-spade 1-heart 2-diamond 3-club 4-little joker 5- big joker
     * 低4位表示点数 3,4,5,6,7,8,9,10,11,12,13,A,2,litterJoker,bigJoker
     * 低4位表示点数 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14
     * 对应16进制牌0x10,0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1A,0x1B,0x1C,0x4D,0x5E
     */

    properties: {
        _clickEnable: true,
        // 背板
        backSpr: {
            default: null,
            type: cc.Sprite
        },
        // 正面节点
        frontNode: {
            default: null,
            type: cc.Node
        },
        // 正面背板
        frontSpr: {
            default: null,
            type: cc.Sprite
        },
        // 点数，大小王没有
        pointSpr: {
            default: null,
            type: cc.Sprite
        },
        // 点数下面的花色
        smallFlowerSpr: {
            default: null,
            type: cc.Sprite
        },
        // 中间的花色
        bigFlowerSpr: {
            default: null,
            type: cc.Sprite
        },
        // 地主的标识
        tagSpr: {
            default: null,
            type: cc.Sprite
        },
        altas: {
            default: null,
            type: cc.SpriteAtlas
        },
        value: null,
        selected: false
    },

    ctor() {
        this._jokerMap = {
            0: 3,
            1: 4,
            2: 5,
            3: 6,
            4: 7,
            5: 8,
            6: 9,
            7: 10,
            8: 'J',
            9: 'Q',
            10: 'K',
            11: 'A',
            12: 2,
            13: 'litterJoker',
            14: 'bigJoker',
        };
        this._pointPath = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2", 'litterJoker', 'bigJoker']
        this._typePath = ["black", "red", "red", "black"];
        this._flowerPath = ["images-poker-Card_hearts_black_1", "images-poker-Card_hearts_red_1", "images-poker-Card_Square-piece_red_1",
            "images-poker-Card_Flower_black_1", "images-poker-Card_clown_gray", "images-poker-Card_clown_red"];

        this._altas = null;
    },

    getType: function (value) {
        return value >> 4;
    },
    getPoint: function (value) {
        return value & 0x0F;
    },

    /**
     * 翻转，
     * true，显示正面
     * false,显示背面
     */
    flip(front) {
        this._flip(front);
    },

    _flip(front) {

        this.frontNode.enabled = front;
        this.backSpr.enabled = !front;

        // todo animation
    },

    initPoker(value, sizeType) {
        // if (value == 0) {
        //     this.flip(false);
        //     return;
        // }
        // this.flip(false);
        // // return;
        // this.flip(true);
        this.value = value + '';
        // console.log(value+'');
        var type = this.getType(this.value);
        if (this._isJoker(type)) {
            //大小王的情况
            if (type === 4) {
                var path = "images-poker-Card_JOKER_black";
                var spriteFrame = this.altas.getSpriteFrame(path);
                this.pointSpr.spriteFrame = spriteFrame;
                // this.pointSpr.scale =0.1;
                this.pointSpr.node.setPosition(cc.v2(-52, 30));
                var flower = this.altas.getSpriteFrame("images-poker-Card_clown_gray");
                this.bigFlowerSpr.spriteFrame = flower;
                this.smallFlowerSpr.spriteFrame = null;
            } else {
                var path = "images-poker-Card_JOKER_red";
                var spriteFrame = this.altas.getSpriteFrame(path);
                this.pointSpr.spriteFrame = spriteFrame;
                this.pointSpr.node.setPosition(cc.v2(-52, 30));

                // this.pointSpr.scale = 0.1;
                var flower = this.altas.getSpriteFrame("images-poker-Card_clown_red");
                this.bigFlowerSpr.spriteFrame = flower;
                this.smallFlowerSpr.spriteFrame = null;

            }
        } else {
            var point = this.getPoint(value);
            var pointPath = this._jokerMap[point];
            var typePath = this._typePath[type];
            var path = "images-poker-Card_" + pointPath + "_" + typePath;
            var spriteFrame = this.altas.getSpriteFrame(path);
            this.pointSpr.spriteFrame = spriteFrame;
            var flowerPath = this._flowerPath[type];
            var flower = this.altas.getSpriteFrame(flowerPath);
            this.smallFlowerSpr.spriteFrame = flower;
            this.smallFlowerSpr.scale = 0.4;//没起作用
            this.bigFlowerSpr.spriteFrame = flower;
        }

        if (sizeType === 1) {
            this.node.scale = 0.6;
        }
    },

    doDisable() {
        this._clickEnable = false;
    },

    _isJoker: function (type) {
        return type > 3;
    },
    selectPoker: function () {//选中扑克和取消选择
        if (!this._clickEnable) {
            return;
        }
        if (this.selected) {//取消选中
            this.selected = false;
            this.node.y -= 15;
        }
        else {//选中
            this.selected = true;
            this.node.y += 15;
        }

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.tagSpr.enabled = false;

    },
    start() {
    },

    // update (dt) {},
});
