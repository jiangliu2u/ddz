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
            this.startCountdown(15);
        }
        this.node.active = v;
    },
    onEnable(){
        this.startCountdown(15);
    },
    onDisable(){
        this.stopCountdown();
    },
    _scheduleClock: function () {
        this._countdown--;
        if (this._countdown < 0) {
            
            this.stopCountdown();
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
