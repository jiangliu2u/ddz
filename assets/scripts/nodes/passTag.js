cc.Class({
    extends: cc.Component,

    properties: {
        panel:{
            default:[],
            type:cc.Node
        }


    },
    onLoad(){
        this.panel[0] = cc.find('Canvas/passTag/selfPanel');
        this.panel[1] = cc.find('Canvas/passTag/rightPanel');
        this.panel[2] = cc.find('Canvas/passTag/leftPanel');
    },
    showSelfPass(){
        this.panel[0].children[0].active = true;
    },
    showRightPass(){
        this.panel[1].children[0].active = true;

    },
    showLeftPass(){
        this.panel[2].children[0].active = true;

    },
    hideSelfPass() { 
        this.panel[0].children[0].active = false;

    },
    hideRightPass() { 
        this.panel[1].children[0].active = false;

    },
    hideLeftPass() {
        this.panel[2].children[0].active = false;

     },
     hidePasses(){
         this.hideSelfPass();
         this.hideRightPass();
         this.hideLeftPass();
     }
    // update (dt) {},
});
