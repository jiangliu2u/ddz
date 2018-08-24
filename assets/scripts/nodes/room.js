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
        
    },

    // LIFE-CYCLE CALLBACKS:

    ctor() {
        this._onClickCallback = null;
    },

    onLoad () {
        //common.EventDispatcher.listen(common.EventType.MSG_DDZ_CREATE_ROOM, this.onCreateRoom, this);
    },

    setOnClickCallback(callback) {
        this._onClickCallback = callback;
    },

    onCreateRoom(data) {
        //cc.director.loadScene('Game');
    },

    // createRoom: function () {
    //     console.log('创建房间！');
    //     g.player.emit("create room", { 'name': this.id });
    //     if (this._onClickCallback) {
    //         this._onClickCallback();
    //     }
    //     // cc.director.loadScene('Game');

    //     // g.player.on('create room', function (data) {
    //     //     console.log(data);
    //     //     common.EventDispatcher.trigger(ddz.EventType.MSG_DDZ_ENTER_TABLE, data);
    //     // });

    // },
    
    start() {

    },

    // update (dt) {},
});
