// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        selfFaceNode: {
            default: null,
            type: cc.Node
        },
        leftFaceNode: {
            default: null,
            type: cc.Node
        },
        rightFaceNode: {
            default: null,
            type: cc.Node
        },
        faceControllerPref: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:
    _initFace: function (data) {
        //自己
        switch (data["allPlayers"].length) {
            case 0:
                break;
            case 1:
                var faceItem = cc.instantiate(this.faceControllerPref);
                faceItem.getComponent('facecontroller').initFace(data["allPlayers"][0], 9999, null);
                this.leftFaceNode.addChild(faceItem);
                faceItem.setPosition(cc.v2(0, 0));
                break;
            case 2:

                var faceItem1 = cc.instantiate(this.faceControllerPref);
                faceItem1.getComponent('facecontroller').initFace(data["allPlayers"][0], 12345, null);
                this.rightFaceNode.addChild(faceItem1);
                faceItem1.setPosition(cc.v2(0, 0));
                var faceItem2 = cc.instantiate(this.faceControllerPref);
                faceItem2.getComponent('facecontroller').initFace(data["allPlayers"][1], 9999, null);
                this.leftFaceNode.addChild(faceItem2);
                faceItem2.setPosition(cc.v2(0, 0));

        }

        //右边玩家


        //左边玩家


    },
    onLoad() {
        var faceItem0 = cc.instantiate(this.faceControllerPref);
        faceItem0.getComponent('facecontroller').initFace("hehe", 67890, null);
        this.selfFaceNode.addChild(faceItem0);
        faceItem0.setPosition(cc.v2(0, 0));
        //this._initFace();
    },

    start() {

    },

    // update (dt) {},
});
