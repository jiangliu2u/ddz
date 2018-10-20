// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    musicSwitch: cc.Node = null;

    @property(cc.Node)
    soundSwitch: cc.Node = null;
    
       

    init() {
        return new Promise(resolve=>{
            this.musicSwitch = cc.find("Canvas/settings/music/switch");
            this.soundSwitch = cc.find("Canvas/settings/sound/switch");
            resolve();
        });
        
    }
    switchMusic(){
        if (this.musicSwitch.getComponent(cc.Toggle).isChecked){
            cc.log("打开音乐");
        }else{
            cc.log("关闭音乐");
        }
        
    }
    switchSound(){
        if (this.soundSwitch.getComponent(cc.Toggle).isChecked) {
            cc.log("打开音效");
        } else {
            cc.log("关闭音效");
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init().then(() => {
            this.musicSwitch.getComponent(cc.Toggle).node.on('toggle', this.switchMusic, this);
            this.soundSwitch.getComponent(cc.Toggle).node.on('toggle', this.switchSound, this);
        });
        
    }

    start() {


    }

    // update (dt) {}
}
