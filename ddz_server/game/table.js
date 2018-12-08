const PokerSets = require("../poker/poker_sets");
const Util = require("../poker/Util");
// const Player = require("../common/player");
const EventType = require("../common/event_type");
const Log = require("../common/Log");


/**
 * 下面只是一个简单的模板，实际需要更多的接口
 * 这是游戏的主要的业务逻辑的处理！
 */

function Table(type, id) {
    this._type = type; // 桌子类型
    this._id = id; // 全局唯一的桌子ID

    this._playerList = [];//玩家列表
    this._dipai = [];
    this.landlord = -1;//地主座位号
    this.times = 1;//倍数
    this._preparedList = [];
    this.record = [];

}


Table.prototype.onMsg = function (msg) {
    // 所有的桌子接受的消息都投递到这个借口
    var cmd = msg["cmd"];
    Log.info("table onMsg: " + JSON.stringify(msg));
    switch (cmd) {
        case 'discard':
            this.discard(msg);
            break;
        case 'pass':
            // 不要
            this.pass(msg);
            break;
        case 'prepare':
            // 准备
            this.prepare(msg);
            break;
        case 'call_landlord':
            // 准备
            this.callLandlord(msg);
            break;
        case 'no_call_landlord':
            // 准备
            this.noCallLandlord(msg);
            break;
        case 'rob_landlord':
            // 准备
            this.robLandlord(msg);
            break;
        case 'no_rob_landlord':
            // 准备
            this.noRobLandlord(msg);
            break;
        // 可以添加更多相关的接口
        case 'start':
            this.startGame();
            break;
        case 'join':
            this.joinTable(msg);
            break;
        case 'gameover':
            this.endGame(msg);
            break;
        case 'leave':
            this.leaveTable(msg);
            break;

    }
};


Table.prototype.startGame = function () {
    // 游戏开始
    this._preparedList = [];
    this.dealPoker();
};

Table.prototype.endGame = function (msg) {
    // 游戏结束，开始结算
    this._preparedList = [];
    this.record = [];
    let player = global.playerManager.getPlayerById(msg["playerId"]);
    player.broadcastMsg(player.tableId, EventType.MSG_DDZ_GAME_OVER, {team: player.team, info: "game over"});//seatId为出完牌的玩家座位号
    //结束比赛后其他操作，比如写入数据库
};

Table.prototype.dealPoker = function () {
    // 发牌
    //this.generatePokers();
    this.generateTestPokers();//测试
    // 这个地方最好使用广播的借口，而且发送消息最好不要在这个‘发牌函数’内进行。‘发牌’就只做‘发牌’，未来可以添加其他的发牌机制，就只用修改这个方法就可以了
    //this.landlord_index = Math.floor(Math.random() * 3);//开始随机选择一个人开始叫地主
    this.landlord_index = 2;//开始选择第三个玩家为地主
    // this._playerList[landlord_index].setTeam(1);
    Log.info("座位号:" + this.landlord_index + " 为开始玩家");
    Log.warn(this._playerList)
    for (var i = 0; i < this._playerList.length; i++) {
        Log.info("给第" + (i + 1) + "个玩家发牌");
        this._playerList[i].sendMsg(EventType.MSG_DDZ_DEAL_POKER, {
            startP: this.landlord_index,
            pokers: this.threePlayerPokers[i],
            dipai: this._dipai
        });

    }
};
Table.prototype.generatePokers = function () {
    this.threePlayerPokers = [];
    this.pokers = new PokerSets(1, true).getPokers();//生成一副牌，带大小王
    let allPokers = this.pokers;
    for (let i = 0; i < 3; i++) {//生成2个17张的扑克组合并放入3个玩家扑克的数组中
        let bodyPokerDataItem = [];
        for (let j = 0; j < 17; j++) {
            let num = Math.floor(Math.random() * (allPokers.length));//随机抽取
            let pokerData = allPokers[num];
            bodyPokerDataItem.push(pokerData);
            allPokers.splice(num, 1);//删除抽取的元素
        }
        this.threePlayerPokers.push(bodyPokerDataItem);
    }
    // this.threePlayerPokers.push(bodyPokerDataItem);
    this._dipai = allPokers;
    for (let i = 0; i < 3; i++) {//排序
        this.threePlayerPokers[i].sort(Util.gradeDown);
    }
};
Table.prototype.generateTestPokers = function () {
    this.threePlayerPokers = [];
    this.pokers = new PokerSets(1, true).getPokers();//生成一副牌，带大小王
    let allPokers = this.pokers;
    this.threePlayerPokers.push(allPokers.slice(0,17));
    this.threePlayerPokers.push(allPokers.slice(17,34));
    this.threePlayerPokers.push(allPokers.slice(34,51));
    // this.threePlayerPokers.push(bodyPokerDataItem);
    this._dipai = allPokers.slice(51,55);
    for (let i = 0; i < 3; i++) {//排序
        this.threePlayerPokers[i].sort(Util.gradeDown);
    }
};

Table.prototype.joinTable = function (msg) {
    /**
     * 玩家加入桌子的入口
     * 1. 这是玩家进入桌子的唯一入口
     * 2. 将玩家加入玩家列表(this._playerList)；
     * 3. 不能直接从外部直接将玩家加入_playerList
     */
        // 通过方法访问，getPlayerById(id) getPlayers(ids) getAllPlayer();
        // 不要通过属性访问
    let player = global.playerManager.getPlayerById(msg["playerId"]);
    let all = [];
    for (let i = 0, len = this._playerList.length; i < len; i++) {
        all.push({index: i, player: this._playerList[i].accountId});//
    }
    setTimeout(function () {
        player.sendMsg(EventType.MSG_DDZ_ENTER_TABLE, {allPlayers: all});//发送给自己，信息为已连接的玩家
    }, 1000);

    this._playerList.push(player);
    player.joinTable(this._id);
    player.setTableId(this._id);
    player.broadcastMsg(player.tableId, EventType.MSG_DDZ_NEW_PLAYER, {
        seatId: this._playerList.indexOf(player),
        player: player.accountId
    });
    //通知桌子内其他玩家，信息为本玩家的信息，以及位置

};
Table.prototype.prepare = function (data) {
    let player = global.playerManager.getPlayerById(data["playerId"]);
    this._preparedList.push(this._playerList.indexOf(player));
    player.sendMsg(EventType.MSG_DDZ_PLAYER_PREPARED, {seatId: player.seatId});
    if (this._preparedList.length === 3) {
        let self = this;
        setTimeout(function () {//延迟三秒发牌，太快客户端事件绑定可能还未完成....
            self.startGame();
            Log.info("人数已满,开始发牌");
        }, 3000);
    }
};
Table.prototype.cal = function () {//计算叫地主是否完成
    console.log(this.record);
    if (this.record.length < 3) {
        return false;
    } else if (this.record.length === 3) {
        if (this.record[0] === 1 && this.record[1] === 0 && this.record[2] === 0) {
            this.landlord = this.landlord_index;
            this._playerList[this.landlord].setTeam(1);
            return true;
        }
        else if (this.record[0] === 0 && this.record[1] === 1 && this.record[2] === 0) {
            this.landlord = (this.landlord_index + 1) % 3;
            this._playerList[this.landlord].setTeam(1);
            return true;
        }
        else if (this.record[0] === 0 && this.record[1] === 0 && this.record[2] === 1) {
            this.landlord = (this.landlord_index + 2) % 3;
            this._playerList[this.landlord].setTeam(1);
            return true;
        } else {
            return false;
        }
    } else if (this.record.length === 4) {
        if (this.record[3] === 1 && this.record[0] === 1) {
            this.landlord = this.landlord_index;
            this._playerList[this.landlord].setTeam(1);
            return true;
        } else if (this.record[0] === 1 && this.record[1] === 1 && this.record[2] === 0 && this.record[3] === 0) {
            this.landlord = (this.landlord_index + 1) % 3;
            this._playerList[this.landlord].setTeam(1);
            return true;
        } else if (this.record[0] === 0 && this.record[1] === 1 && this.record[2] === 1 && this.record[3] === 1) {
            this.landlord = (this.landlord_index + 1) % 3;
            this._playerList[this.landlord].setTeam(1);
            return true;
        } else if (this.record[0] === 0 && this.record[1] === 1 && this.record[2] === 1 && this.record[3] === 0) {
            this.landlord = (this.landlord_index + 2) % 3;
            this._playerList[this.landlord].setTeam(1);
            return true;
        } else if (this.record[0] === 1 && this.record[1] === 0 && this.record[2] === 1 && this.record[3] === 0) {
            this.landlord = (this.landlord_index + 2) % 3;
            this._playerList[this.landlord].setTeam(1);
            return true;
        } else if (this.record[0] === 1 && this.record[1] === 1 && this.record[2] === 1 && this.record[3] === 0) {
            this.landlord = (this.landlord_index + 2) % 3;
            this._playerList[this.landlord].setTeam(1);
            return true;
        }
        else {
            this.landlord = (this.landlord_index + 2) % 3;
            this._playerList[this.landlord].setTeam(1);
            return true;
        }
    }


};
Table.prototype.sendToAll = function (cmd, msg) {
    for (let i = 0; i < this._playerList.length; i++) {
        this._playerList[i].sendMsg(cmd, msg);
    }

};
Table.prototype.callLandlord = function (data) {
    this.record.push(1);
    let player = global.playerManager.getPlayerById(data["playerId"]);
    this.toShow = (this._playerList.indexOf(player) + 1) % 3;
    player.broadcastMsg(player.tableId, EventType.MSG_DDZ_CALL_LANDLORD, {
        seatId: this._playerList.indexOf(player),
        toshow: this.toShow
    });
};
Table.prototype.noCallLandlord = function (data) {
    let player = global.playerManager.getPlayerById(data["playerId"]);
    this.toShow = (this._playerList.indexOf(player) + 1) % 3;
    this.record.push(0);
    if (this.cal()) {
        //开始
        let msg = {landlord: this.landlord};
        this.sendToAll(EventType.MSG_DDZ_START, msg)
    } else {
        player.broadcastMsg(player.tableId, EventType.MSG_DDZ_NO_CALL_LANDLORD, {
            seatId: this._playerList.indexOf(player),
            toshow: this.toShow
        });
    }
};
Table.prototype.robLandlord = function (data) {
    let player = global.playerManager.getPlayerById(data["playerId"]);
    this.record.push(1);
    console.log(this.record);
    if (this.record.length === 3) {
        if (this.record[0] === 0 && this.record[1] === 1 && this.record[2] === 1) {
            this.toShow = (this._playerList.indexOf(player) + 2) % 3;
            player.broadcastMsg(player.tableId, EventType.MSG_DDZ_ROB_LANDLORD, {
                seatId: this._playerList.indexOf(player),
                toshow: this.toShow
            });
        } else {
            this.toShow = (this._playerList.indexOf(player) + 1) % 3;
            if (this.cal()) {
                //开始
                let msg = {landlord: this.landlord};
                this.sendToAll(EventType.MSG_DDZ_START, msg)
            } else {
                player.broadcastMsg(player.tableId, EventType.MSG_DDZ_ROB_LANDLORD, {
                    seatId: this._playerList.indexOf(player),
                    toshow: this.toShow
                });
            }
        }
    } else {
        this.toShow = (this._playerList.indexOf(player) + 1) % 3;
        if (this.cal()) {
            //开始
            let msg = {landlord: this.landlord};
            this.sendToAll(EventType.MSG_DDZ_START, msg)
        } else {
            player.broadcastMsg(player.tableId, EventType.MSG_DDZ_ROB_LANDLORD, {
                seatId: this._playerList.indexOf(player),
                toshow: this.toShow
            });
        }
    }


};
Table.prototype.noRobLandlord = function (data) {
    let player = global.playerManager.getPlayerById(data["playerId"]);
    this.record.push(0);
    this.toShow = (this._playerList.indexOf(player) + 1) % 3;
    if (this.cal()) {  //开始
        let msg = {landlord: this.landlord};
        this.sendToAll(EventType.MSG_DDZ_START, msg)
    } else {
        player.broadcastMsg(player.tableId, EventType.MSG_DDZ_ROB_LANDLORD, {
            seatId: this._playerList.indexOf(player),
            toshow: this.toShow
        });
    }
};


Table.prototype.pass = function (data) {
    let player = global.playerManager.getPlayerById(data["playerId"]);
    player.broadcastMsg(player.tableId, EventType.MSG_DDZ_PASS, {seatId: this._playerList.indexOf(player)});
};
Table.prototype.discard = function (data) {
    let player = global.playerManager.getPlayerById(data["playerId"]);
    let seatId = this._playerList.indexOf(player);
    let msg = {
        seatId: seatId,
        pokers: data["pokers"]
    };
    player.broadcastMsg(player.tableId, EventType.MSG_DDZ_DISCARD, msg);
};
Table.prototype.broadcastMsg = function (id, cmd, msg) {
    // 根据idList找到所有的玩家，并广播消息
    let player = global.playerManager.getPlayerById(id);
    player.broadcastMsg(player.tableId, cmd, msg);

};
Table.prototype.leaveTable = function (msg) {
    /**
     * 玩家离开桌子的接口
     * 1. 任何玩家想要离开桌子，必须通过该方法
     * 2. 不能直接从外部直接将玩家从_playerList中移除！！
     *
     */
    let player = global.playerManager.getPlayerById(msg["playerId"]);
    let i = this._playerList.indexOf(player);
    player.broadcastMsg(player.tableId,EventType.MSG_DDZ_PLAYER_LEAVE,{seatId:i});
    this._playerList.splice(i, 1);
    player.leaveTable(player.tableId);
    Log.warn(player.seatId + "：离开了房间," + " 剩余玩家人数: " + this._playerList.length);
    this.record = [];

};
Table.prototype.onDisconnect = function (data) {
    let player = global.playerManager.getPlayerById(data.id);
    let i = this._playerList.indexOf(player);
    player.broadcastMsg(player.tableId,EventType.MSG_DDZ_PLAYER_LEAVE,{seatId:i});
    player.leaveTable(player.tableId);
    this._playerList.splice(i, 1);
    Log.warn("座位号:" + i + "的玩家断开了链接链接," + " 剩余玩家人数: " + this._playerList.length);
};


Table.prototype.startTimer = function (callback, interval, repeat, delay) {
    // 启动一个定时器
    var timer = new Timer();	// Timer也是一个基础类，可以找下js有没有一些好的类库，已经封装了Timer,也可以用setTimerout, setInterval自己封装下
    // 用来做超时处理

    return timer;
};
Table.prototype.killTimer = function (timer) {
    // 杀掉一个timer
};


module.exports = Table;
