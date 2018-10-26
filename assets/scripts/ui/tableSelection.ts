const { ccclass, property } = cc._decorator;

@ccclass
export default class tableSelection extends cc.Component {


    @property(cc.Label)
    tableId: cc.Label = null;
    entertable() {
        let tId = parseInt(this.tableId.string)
        if (tId > 1 && tId < 100) {
            cc.find("Canvas/Home").getComponent("Home").enterTable(parseInt(this.tableId.string));
        }
        else {
            console.log('桌子不存在!');
            return;
        }
    }
    onLoad() {
        this.tableId.string = ' ';
    }

    start() {

    }
    one() {
        if (this.tableId.string.length < 3) this.tableId.string += 1;
    }
    two() {
        if (this.tableId.string.length < 3) this.tableId.string += 2;

    }
    three() {
        if (this.tableId.string.length < 3) this.tableId.string += 3;
    }
    four() {
        if (this.tableId.string.length < 3) this.tableId.string += 4;
    }
    five() {
        if (this.tableId.string.length < 3) this.tableId.string += 5;
    }
    six() {
        if (this.tableId.string.length < 3) this.tableId.string += 6;
    }
    seven() {
        if (this.tableId.string.length < 3) this.tableId.string += 7;
    }
    public eight() {
        if (this.tableId.string.length < 3) this.tableId.string += 8;
    }
    nine() {
        if (this.tableId.string.length < 3) this.tableId.string += 9;
    }
    zero() {
        if (this.tableId.string.length < 3) this.tableId.string += 0;
    }
    retype() {
        this.tableId.string = '';
    }
    delete() {
        this.tableId.string = this.tableId.string.substring(-1, this.tableId.string.length - 1);
    }
    onEnable() {
        this.tableId.string = '';
    }
    // update (dt) {}
}
