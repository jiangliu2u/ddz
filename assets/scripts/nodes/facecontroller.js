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

    initFace: function(name, coin, num) {
        this.nameLbl.string = name;
        this.coinLbl.string = coin + '';
        // var spriteFrame =
        this.faceSpr.spriteFrame = this.FACE_MAP[num];
    },
    changeFace(isLandlord){
        if (isLandlord){
            this.faceSpr.spriteFrame = this.FACE_MAP[1];
            console.log('地主头像');
        }else{
            this.faceSpr.spriteFrame = this.FACE_MAP[0];
            console.log('农民头像');
        }
    },
    start () {

    },

    // update (dt) {},
});
