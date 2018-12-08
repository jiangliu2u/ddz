cc.Class({
    extends: cc.Component,

    properties: {
        FACE_MAP: {
            default: [],
            type: cc.SpriteFrame
        },
        nameLbl: {
            default: null,
            type: cc.Label
        },
        coinLbl: {
            default: null,
            type: cc.Label
        },
        faceSpr: {
            default: null,
            type: cc.Sprite
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    initFace: function (name, coin, num) {
        if(name)this.nameLbl.string = name;
        if(coin)this.coinLbl.string = coin + '';
        if(num)this.faceSpr.spriteFrame = this.FACE_MAP[num];
    },
    changeFace(isLandlord) {
        if (isLandlord) {
            console.log(this.faceSpr.size + ' landlord size');
            console.log(this.faceSpr);
            this.faceSpr.spriteFrame = this.FACE_MAP[1];
        } else {
            console.log(this.faceSpr);
            this.faceSpr.spriteFrame = this.FACE_MAP[0];
        }
    },
    start() {

    },

    // update (dt) {},
});
