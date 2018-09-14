const common = require("../common/_init");

cc.Class({
    extends: cc.Component,

    properties: {
        showPanel: {
            /**
             * 显示玩家是否叫地主、抢地主
             * 0自己，1右边，2左边
             * 每个的子节点为提示，0不叫，1不抢、2叫地主、3抢地主
             */
            default: [],
            type: cc.Node
        },
        controlPanel: {
            /**
             * 操作按钮layout，
             *0叫地主和不叫，1抢地主和不抢
             */
            default: [],
            type: cc.Node
        }

    },
    init(){
        this.controlPanel[0] = cc.find('Canvas/controlPanel/callBtn');
        this.controlPanel[1] = cc.find('Canvas/controlPanel/robBtn');
        this.showPanel[0] = cc.find('Canvas/callLandlord/selfPanel');
        this.showPanel[1] = cc.find('Canvas/callLandlord/rightPanel');
        this.showPanel[2] = cc.find('Canvas/callLandlord/leftPanel');
    },
    //显示叫地主按钮
    showCallBtn() {
        this.controlPanel[0].active = true;

    },
    //隐藏叫地主按钮
    hideCallBtn() {
        this.controlPanel[0].active = false;

    },

    //显示抢地主按钮
    showRobBtn() {
        this.controlPanel[1].active = true;
    },
    //隐藏抢地主按钮
    hideRobBtn() {
        this.controlPanel[1].active = false;
    },
    onLoad() {
        this.init();
    },


    //自己不叫
    showNoCall() {
        this.showPanel[0].children[0].active = true;

    },
    //隐藏自己不叫提示
    hideNoCall() {
        this.showPanel[0].children[0].active = false;

    },
    //自己不抢
    showNoRob() {
        this.showPanel[0].children[1].active = true;

    },
    //隐藏自己不抢提示
    hideNoRob() {
        this.showPanel[0].children[1].active = false;
    },
    //显示自己叫地主
    showCall() {
        this.showPanel[0].children[2].active = true;

    },
    //隐藏自己叫地主提示
    hideCall() {
        this.showPanel[0].children[2].active = false;

    },
    //自己抢地主提示
    showRob() {
        this.showPanel[0].children[3].active = true;

    },
    //隐藏自己抢地主提示
    hideRob() {
        this.showPanel[0].children[3].active = false;
    },
    







    //别人叫地主
    showOtherCall(isLeft) {
        if (isLeft) {
            this.showPanel[2].children[2].active = true;
        } else {
            this.showPanel[1].children[2].active = true;
        }

    },
    //隐藏别人叫地主提示
    hideOtherCall() {
        this.showPanel[2].children[2].active = false;
        this.showPanel[1].children[2].active = false;

    },
    //别人抢地主提示
    showOtherRob(isLeft) {
        if (isLeft) {
            this.showPanel[2].children[3].active = true;
        } else {
            this.showPanel[1].children[3].active = true;
        }

    },
    //隐藏别人抢地主提示
    hideOtherRob() {
        this.showPanel[2].children[3].active = false;
        this.showPanel[1].children[3].active = false;
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
    hideOtherNoCall() {
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
    hideOtherNoRob() {
        this.showPanel[2].children[1].active = false;
        this.showPanel[1].children[1].active = false;
    },




    //叫地主按钮事件
    callLandlord() {
        var msg = {
            cmd: 'call_landlord',
            playerId: g.player.id,
        }
        g.player.sendMsg(common.EventType.MSG_DDZ_CALL_LANDLORD, msg);
        this.hideCallBtn();
        this.showCall();
    },
    //不叫按钮事件
    noCallLandlord() {
        var msg = {
            cmd: 'no_call_landlord',
            playerId: g.player.id,
        }
        g.player.sendMsg(common.EventType.MSG_DDZ_NO_CALL_LANDLORD, msg);
        this.hideCallBtn();
        this.showNoCall();
    },
    //抢地主按钮事件
    robLandlord() {
        var msg = {
            cmd: 'rob_landlord',
            playerId: g.player.id,
        }
        g.player.sendMsg(common.EventType.MSG_DDZ_ROB_LANDLORD, msg);
        this.hideRobBtn();
        this.showRob();
        
    },
    //不抢按钮事件
    noRobLandlord() {
        g.player.status = 0;
        var msg = {
            cmd: 'no_rob_landlord',
            playerId: g.player.id,
            status: g.player.status
        }
        g.player.sendMsg(common.EventType.MSG_DDZ_NO_ROB_LANDLORD, msg);
        this.hideRobBtn();
        this.showNoRob();
    },
    hideAll(){
        this.hideCall();
        this.hideNoCall();
        this.hideRob()
        this.hideNoRob();
        this.hideOtherCall();
        this.hideOtherNoCall();
        this.hideOtherRob();
        this.hideOtherNoRob();
        this.hideRobBtn();
        this.hideCallBtn();
    },

    start() {

    },

    // update (dt) {},
});
