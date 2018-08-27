// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tableScrollView:{
            default:null,
            type:cc.ScrollView
        },
        table: {
            default: null,
            type: cc.Prefab
        },
        
    },

    //onLoad () {},
    init: function (data) {
        var tables = data["tables"];
        var self = this;
        for (let i = 0, len = tables.length; i < len; i++) {
            let item = cc.instantiate(this.table);
            item.getComponent('table').setTableId(tables[i]);
            this.tableScrollView.content.addChild(item);
        }
    },
    start () {

    },

    // update (dt) {},
});
