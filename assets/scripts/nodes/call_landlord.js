const common = require("../common/_init");

cc.Class({
    extends: cc.Component,

    properties: {
        showPanel: {
            /**
             * 显示玩家是否叫地主、抢地主
             * 0自己，1右边，2左边
             */
            default: [],
            type: cc.Node
        },
        controlPanel: {
            /**
             * 操作按钮
             *0叫地主，1不叫，2抢地主，3不抢
             */
            default: [],
            type: cc.Node
        }

    },

    //显示叫地主按钮
    showCallBtn() {
        this.controlPanel[0].active = true;
        this.controlPanel[1].active = true;

    },
    //隐藏叫地主按钮
    hideCallBtn() {
        this.controlPanel[0].active = false;
        this.controlPanel[1].active = false;

    },

    //显示抢地主按钮
    showRobBtn() {
        this.controlPanel[3].active = true;
        this.controlPanel[4].active = true;
    },
    //隐藏抢地主按钮
    hideRobBtn() {
        this.controlPanel[3].active = false;
        this.controlPanel[4].active = false;
    },
    //别人不叫
    showOtherNoCall(isLeft) {
        if (isLeft) {
            this.showPanel[2].children[0].active = true;
        } else {
            this.showPanel[1].children[0].active = true;
        }

    },
    //隐藏别人不叫提示
    hideNoCall(){
        this.showPanel[2].children[0].active = false;
        this.showPanel[1].children[0].active = false;

    },
    //别人不抢
    showOtherNoRob(isLeft) {
        if (isLeft) {
            this.showPanel[2].children[1].active = true;
        } else {
            this.showPanel[1].children[1].active = true;
        }

    },
    //隐藏别人不抢提示
    hideNoRob(){
        this.showPanel[2].children[1].active = false;
        this.showPanel[1].children[1].active = false;
    },
    onLoad () {
        g.call_landlord = this;
    },

    callLandlord(){
        var msg = {
            cmd:'call_landlord',
            playerId:g.player.id,
        }
        g.player.sendMsg(common.EventType.MSG_DDZ_CALL_LANDLORD,msg);
    },
    noCallLandlord(){
        var msg = {
            cmd: 'no_call_landlord',
            playerId: g.player.id,
        }
        g.player.sendMsg(common.EventType.MSG_DDZ_NO_CALL_LANDLORD, msg);
    },
    robLandlord(){
        var msg = {
            cmd: 'rob_landlord',
            playerId: g.player.id,
        }
        g.player.sendMsg(common.EventType.MSG_DDZ_ROB_LANDLORD, msg);
    },
    noRobLandlord(){
        var msg = {
            cmd: 'no_rob_landlord',
            playerId: g.player.id,
        }
        g.player.sendMsg(common.EventType.MSG_DDZ_NO_ROB_LANDLORD, msg);
    },

    start() {

    },

    // update (dt) {},
});
