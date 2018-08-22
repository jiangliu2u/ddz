window.g = {};
const common = require('_init');
const Player = require("./player");
cc.Class({
    extends: cc.Component,
    properties: {
        rooms:{
            default:null,
            type:cc.Node
        },
        roomItem: {
            default: null,
            type: cc.Prefab
        },
        roomScrollView: {
            default: null,
            type: cc.ScrollView
        },
        facePrefab: {
            default: null,
            type: cc.Prefab
        },
        loadingAnimation: {
            default: null,
            type: cc.Animation
        },
        loadingMask:{
            default:null,
            type:cc.Node
        }
    },
    onLoad: function () {
        this.loadingMask.active = false;
        if (cc.sys.isNative) {
           var io = SocketIO;
        } else {
            var io = require('socket.io');
        }

        // first scene - cocos loading
        // 2nd scene - my loading connect

        // 3rd recevied success cmd: get homeinfo(userinfo)
        // 4th succ: loading home scene

        var socket = io.connect('http://127.0.0.1:3001');
        socket.on("yourid",function(data){
            socket.id = data['id'];
            console.log(socket.id);
            g.player = new Player(socket);
        });
        
        common.EventDispatcher.listen(common.EventType.MSG_DDZ_CREATE_ROOM, this.onCreateRoom, this);
        return;
        g.player.on("rooms",function(data){
            self.deleteRoomNode('room');
            console.log(data);
            
            console.log("显示房间");
            return;
            for(let i in data){//显示房间
                for(let j =0;j<data[i].length;j++){
                    let item = cc.instantiate(self.roomItem);
                    item._name = 'room'
                    item.getComponent('item').roomname.string = i;
                    self.roomScrollView.content.addChild(item);
                }
            }
        });

    },

    onDestroy() {
        console.log("onDestroy");
        common.EventDispatcher.ignore(common.EventType.MSG_DDZ_CREATE_ROOM, this.onCreateRoom, this);
    },

    onCreateRoom(data) {
        cc.director.loadScene('Game');
    },

    createRoom: function () {
        console.log('创建房间！');
        g.player.emit("create room", { 'name': this.id });
        if (this._onClickCallback) {
            this._onClickCallback();
        }
        this.loadingMask.active = true;

        this.loadingAnimation.play('loading');
        cc.director.loadScene('Game');

        // g.player.on('create room', function (data) {
        //     console.log(data);
        //     common.EventDispatcher.trigger(ddz.EventType.MSG_DDZ_ENTER_TABLE, data);
        // });

    },

    deleteRoomNode: function (name) {
        for (var i = 0; i < this.node.children.length; i++) {//删除房间列表
            if (this.node.children[i]._name === name) {
                this.node.children[i].destroy();
                console.log(name + "deleted")
            }
        }
    },
    
    start:function() {

    },

    // update (dt) {},
});
