// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    
    
    
    setTitle(txt:string){
        this.lbl_title.getComponent(cc.Label).string = txt;
    }
    hide(){
        this.node.active = false;
    }

    @property(cc.Node)
    lbl_title:cc.Node = null;
    @property(cc.Node)
    btn_close: cc.Node = null;
    @property(cc.Label)
    label: cc.Label = null;

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lbl_title = cc.find("Canvas/showBoard").getChildByName("lbl_title");
        this.btn_close = cc.find("Canvas/showBoard").getChildByName("close");
        this.btn_close.on(cc.Node.EventType.TOUCH_END,()=>{
            this.hide();
        });
    }

    start () {

    }

    // update (dt) {}
}
