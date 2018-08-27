const common = require('../common/_init');

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
        this.showedId.string = id+1;
    },
    onCreateRoom(data) {
        //cc.director.loadScene('Game');
    },

    start() {

    },

    // update (dt) {},
});
