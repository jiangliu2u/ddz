// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const common = require('common/_init');

cc.Class({
    extends: cc.Component,

    properties: {
        tableId: null,
        showedId:{
            default:null,
            type:cc.Label
        }

    },

    // LIFE-CYCLE CALLBACKS:

    ctor() {
        this._onClickCallback = null;
    },

    onLoad() {
        //common.EventDispatcher.listen(common.EventType.MSG_DDZ_CREATE_ROOM, this.onCreateRoom, this);
    },
    onClick(){
        g.player.sendMsg(common.EventType.MSG_DDZ_ENTER_TABLE, { cmd: "join", tableId: this.tableId, playerId: g.player.id });
        cc.director.loadScene("Game");
    },
    setOnClickCallback(callback) {
        this._onClickCallback = callback;
    },
    setTableId(id) {
        this.tableId = id;
        this.showedId.string = id;
    },
    onCreateRoom(data) {
        //cc.director.loadScene('Game');
    },

    start() {

    },

    // update (dt) {},
});
