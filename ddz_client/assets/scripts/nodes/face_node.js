
cc.Class({
    extends: cc.Component,

    properties: {
        faces: {
            default: [],
            type: cc.Node
        },

        faceControllerPref: {
            default: null,
            type: cc.Prefab
        }
    },

  
    /**
     * data 包含用户数据，如用户名、金币等
     * @param {object} data 
     */
    createLeft: function (data) {
        var faceItem1 = cc.instantiate(this.faceControllerPref);
        faceItem1.getComponent('facecontroller').initFace(data["player"], data["coin"] || 999, 2);
        this.faces[2].addChild(faceItem1);
        faceItem1.setPosition(cc.v2(0, 0));
    },
    createRight: function (data) {
        var faceItem1 = cc.instantiate(this.faceControllerPref);
        faceItem1.getComponent('facecontroller').initFace(data["player"], data["coin"]||999, 2);
        this.faces[1].addChild(faceItem1);
        faceItem1.setPosition(cc.v2(0, 0));

    },
    createSelf(data) {
        var faceItem1 = cc.instantiate(this.faceControllerPref);
        faceItem1.getComponent('facecontroller').initFace(g.player.name || "哈哈", g.player.coin, 2);
        this.faces[0].addChild(faceItem1);
        faceItem1.setPosition(cc.v2(0, 0))
    },
    _changeFace(facePanel, isLandlord) {
        facePanel.children[0].getComponent("facecontroller").changeFace(isLandlord);
    },

    changeLeft(isLandlord) {
        this._changeFace(this.faces[2], isLandlord);
    },
    changeRight(isLandlord) {
        this._changeFace(this.faces[1], isLandlord);
    },
    changeSelf(isLandlord) {
        this._changeFace(this.faces[0], isLandlord);
    },
    deleteLeftFace() {
        this.leftFaceNode.children[0].destroy();
    },
    deleteRightFace() {
        this.rightFaceNode.children[0].destroy();
    },
    /**
     * 把所有玩家头像设置回原始状态
     */
    changeToDefault() {
        this.faces[0].children[0].getComponent('facecontroller').initFace();
        this.faces[1].children[0].getComponent('facecontroller').initFace();
        this.faces[2].children[0].getComponent('facecontroller').initFace();
    },
    
    onLoad() {


        // this.faceItem3.getComponent('facecontroller').initFace("LeftPName", 99999, 2);
    },

    start() {

    },

    // update (dt) {},
});
