const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    label: cc.Node = cc.find("Canvas/Home/tableSelection");

    @property
    text: string = 'hello';
    

    onLoad () {}

    start () {

    }

    // update (dt) {}
}
