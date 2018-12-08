
cc.Class({
    extends: cc.Component,

    properties: {
        panel:{
            default:[],
            type:cc.Node
        }
    },
    init(){
        this.panel[0] = cc.find("Canvas/timerPanel/leftPanel/clock");
        this.panel[1] = cc.find("Canvas/timerPanel/rightPanel/clock");
    },
    onLoad () {
        this.init();
    },
    showLeftTimer(){
        this.panel[0].active = true;
        
    },
    hideLeftTimer(){
        this.panel[0].active = false;
    },
    showRightTimer(){
        this.panel[1].active = true;
        console.log("show right clock");

    },
    hideRightTimer(){
        this.panel[1].active = false;
    },
    hideAllTimer(){
        this.panel[0].active = false;
        this.panel[1].active = false;
    },
    start () {

    },

    // update (dt) {},
});
