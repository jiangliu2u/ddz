cc.Class({
    extends: cc.Component,

    properties: {
        _countdown: 0,
        countdownLbl: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
    },
    startCountdown: function (countdown) {
        this._countdown = countdown;
        this._doShow();
        this._doSetCountdown(this._countdown);
        this.schedule(this._scheduleClock, 1);
    },
    setVisible(v) {
        if (v) {
            console.log("set true");
            this._doShow();
            this.startCountdown(5);
        }else{
            this._doHide();
        }
    },
    _scheduleClock: function () {
        this._countdown--;
        if (this._countdown < 0) {//倒计时结束，自动不要或者出牌
            console.log("倒计时结束");
            this.stopCountdown();
            if (g.handedoutPokers["pokers"].length === 0 || g.handedoutPokers["seatId"] === g.player.seatId){
                var pp = cc.find("Canvas/pokerPanel").getComponent("poker_panel");
                pp.autoDiscard();
            }else{
                var cp = cc.find("Canvas/controlPanel").getComponent("control_panel");
                setTimeout(function () {
                    cp.pass();
                }, 50);
            }
            
            return;
        }
        this._doSetCountdown(this._countdown);
    },

    _doShow: function () {
        this.node.active = true;
    },

    _doHide: function () {
        this.node.active = false;
    },

    _doSetCountdown: function (countdown) {
        this.countdownLbl.string = countdown;
    },

    stopCountdown: function () {
        this._doSetCountdown(0);
        //this._doHide();
        this.unschedule(this._scheduleClock);
    },

    start() {

    },

    // update (dt) {},
});
