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
        if (data["allPlayers"]) {//加入桌子时获取已经加入的玩家
            console.log("获取已经加入的玩家...");
            switch (data["allPlayers"].length) {
                case 0:
                    g.player.setSeatId(0);
                    break;
                case 1:
                    g.player.setSeatId(1);
                    this._createLeft(data["allPlayers"][0]);
                    break;
                case 2:
                    g.player.setSeatId(2);
                    this._createRight(data["allPlayers"][0]);
                    this._createLeft(data["allPlayers"][1]);
                    break;
            }
            var faceItem0 = cc.instantiate(this.faceControllerPref);
            faceItem0.getComponent('facecontroller').initFace(g.player.seatId + 1, 67890, null);
            this.selfFaceNode.addChild(faceItem0);
            faceItem0.setPosition(cc.v2(0, 0));
        }
        //有新玩家加入时 
        if (data["index"]) {
            console.log("有新玩家加入...");
            console.log(data);
            switch (data["index"]) {
                case 1:
                    this._createRight(data);
                    break;
                case 2:
                    if (g.player.seatId === 0) {
                        this._createLeft(data);
                    }
                    if (g.player.seatId === 1) {
                        this._createRight(data);
                    }
                    console.log("第三个玩家");
                    console.log(data);

                    console.log("显示第三个玩家");
                    break;
            }
        }

    },
    _createLeft: function (data) {
        console.log("左边玩家");

        var faceItem4 = cc.instantiate(this.faceControllerPref);
        faceItem4.getComponent('facecontroller').initFace(data["index"] + 1, 9999, null);
        this.leftFaceNode.addChild(faceItem4);
        faceItem4.setPosition(cc.v2(0, 0));
    },
    _createRight: function (data) {
        console.log("右边玩家");
        var faceItem3 = cc.instantiate(this.faceControllerPref);
        faceItem3.getComponent('facecontroller').initFace(data["index"] + 1, 12345, null);
        this.rightFaceNode.addChild(faceItem3);
        faceItem3.setPosition(cc.v2(0, 0));
    },
    onLoad() {
        // ar faceItem0 = cc.instantiate(this.faceControllerPref);
        // faceItem0.getComponent('facecontroller').initFace("hehe", 67890, null);
        // this.selfFaceNode.addChild(faceItem0);
        // faceItem0.setPosition(cc.v2(0, 0));v
        //this._initFace();
    },

    start() {

    },

    // update (dt) {},
});
