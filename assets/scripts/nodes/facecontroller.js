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
        this.nameLbl.string = name;
        this.coinLbl.string = coin + '';
        // var spriteFrame =
        this.faceSpr.spriteFrame = this.FACE_MAP[num];
    },
    changeFace(isLandlord) {
        var self = this;
        if (isLandlord) {

            cc.loader.loadRes("face/landlord1", cc.SpriteFrame, function (err, spriteFrame) {
                self.faceSpr.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                console.log('地主头像');
            });
            // this.faceSpr.getComponent(cc.Sprite).spriteFrame = this.FACE_MAP[1]
            // this.faceSpr.spriteFrame = this.FACE_MAP[1];
        } else {
            cc.loader.loadRes("face/farmer1", cc.SpriteFrame, function (err, spriteFrame) {
                self.faceSpr.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                console.log('农民头像');
            });
            // this.faceSpr.getComponent(cc.Sprite).spriteFrame = this.FACE_MAP[0]
            // this.faceSpr.spriteFrame = this.FACE_MAP[0];
        }
    },
    start() {

    },

    // update (dt) {},
});
