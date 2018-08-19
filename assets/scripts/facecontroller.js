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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    initFace: function(name, coin, face) {
        this.nameLbl.string = name;
        this.coinLbl.string = coin + '';

        console.log(this._FACE_MAP);
        // var spriteFrame =
        this.faceSpr.spriteFrame = this.FACE_MAP[0];
    },

    start () {

    },

    // update (dt) {},
});
