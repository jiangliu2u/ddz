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
        selfFaceNode:{
            default:null,
            type:cc.Node
        },
        leftFaceNode: {
            default: null,
            type: cc.Node
        },
        rightFaceNode: {
            default: null,
            type: cc.Node
        },
        faceControllerPref:{
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:
    _initFace:function(){
        //右边玩家
        var faceItem = cc.instantiate(this.faceControllerPref);
        faceItem.getComponent('facecontroller').initFace("zxf", 12345, null);
        this.rightFaceNode.addChild(faceItem);
        //左边玩家
        var faceItem2 = cc.instantiate(this.faceControllerPref);
        faceItem2.getComponent('facecontroller').initFace("InitialJ", 9999, null);
        this.leftFaceNode.addChild(faceItem2);
        
    },
    onLoad () {
        this._initFace();
    },

    start () {

    },

    // update (dt) {},
});
