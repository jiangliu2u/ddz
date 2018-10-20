const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    settings:cc.Node=null;

    init() {
        cc.loader.loadRes("settings.prefab", (errorMessage, prefab) => {
            if (errorMessage) {
                cc.log("加载设置预载资源出错");
                return;
            }
            this.settings = cc.instantiate(prefab);
            this.settings.setPosition(cc.v2(0,0));
        });

    }
    // LIFE-CYCLE CALLBACKS:

    onLoad() { }


    start() {

    }

    // update (dt) {}
}
