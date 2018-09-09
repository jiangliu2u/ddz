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
        if (data["allPlayers"] === undefined && data["seatId"] === undefined) {
            g.player.setSeatId(0);
            console.log("all players空的自己的座位号" + 0);
            g.handedoutPokers = { seatId: 0, pokers: [] };
        }
        if (data["allPlayers"]) {//加入桌子时获取已经加入的玩家
            console.log("获取已经加入的玩家...");
            switch (data["allPlayers"].length) {
                case 0:
                    //没执行
                    g.player.setSeatId(0);
                    g.handedoutPokers = { seatId: 0, pokers: [] };
                    console.log("case 0 获取已经加入的玩家，自己的座位号" + 0);
                    break;
                case 1:
                    g.player.setSeatId(1);
                    g.handedoutPokers = { seatId: 1, pokers: [] };

                    console.log("case 1 获取已经加入的玩家，自己的座位号" + 1);
                    this._createLeft(data["allPlayers"][0]);
                    break;
                case 2:
                    g.player.setSeatId(2);
                    g.handedoutPokers = { seatId: 2, pokers: [] };
                    console.log("case 2 获取已经加入的玩家，自己的座位号" + 2);
                    this._createRight(data["allPlayers"][0]);
                    this._createLeft(data["allPlayers"][1]);
                    break;
            }

        }
        if (data["seatId"]) {
            console.log("有新玩家加入...");
            console.log(data);
            switch (data["seatId"]) {
                case 1:
                    console.log("case 1 新玩家加入，自己的座位号" + g.player.seatId);
                    this._createRight(data);
                    break;
                case 2:
                    console.log("case 2 新玩家加入，自己的座位号" + g.player.seatId);
                    if (g.player.seatId === 0) {
                        this._createLeft(data);
                    }
                    if (g.player.seatId === 1) {
                        this._createRight(data);
                    }
                    console.log("第三个玩家");
                    console.log(data);
                    break;
            }
        }

    },
    _createLeft: function (data) {
        console.log("左边玩家");

        var faceItem4 = cc.instantiate(this.faceControllerPref);
        faceItem4.getComponent('facecontroller').initFace("leftPName" + 1,99999, 2);
        this.leftFaceNode.addChild(faceItem4);
        faceItem4.setPosition(cc.v2(0, 0));
    },
    _createRight: function (data) {
        console.log("右边玩家");
        var faceItem3 = cc.instantiate(this.faceControllerPref);
        faceItem3.getComponent('facecontroller').initFace("rightPName", 99999, 3);
        this.rightFaceNode.addChild(faceItem3);
        faceItem3.setPosition(cc.v2(0, 0));
    },
    createSelf(data) {
        console.log(g.player);
        var faceItem3 = cc.instantiate(this.faceControllerPref);
        faceItem3.getComponent('facecontroller').initFace(g.player.name||"哈哈", g.player.coin, 3);
        this.selfFaceNode.addChild(faceItem3);
        faceItem3.setPosition(cc.v2(0, 0))
    },
    _changeFace(facePanel,isFarmer){
        facePanel.children[0].getComponent("facecontroller").changeFace(isFarmer);
    },
    
    changeLeft(isFarmer){
        this._changeFace(this.leftFaceNode,isFarmer);
    },
    changeRight(isFarmer){
        this._changeFace(this.rightFaceNode,isFarmer);
    },
    changeSelf(isFarmer){
        this._changeFace(this.selfFaceNode,isFarmer);
    },
    deleteLeftFace(){
        this.leftFaceNode.children[0].destroy();
    },
    deleteRightFace() {
        this.rightFaceNode.children[0].destroy();
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
