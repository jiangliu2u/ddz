const EventType = require("./event_type");
const knex = require("../web/db/db");
const Log = require('./Log');
function Player(socket) {
    this.socket = socket;
    this.socketId = this.socket.id;
    this.accountId = Player.ID;
    Player.ID++;
    this.tableId = null;
    this.password = null;
    this.nickname = "";
    this.coin = Math.floor(Math.random() * 10000);
    this.gender = Player.GENDER.SECRET;
    this.team = 0;
    // 用来记录玩家在服务器中的位置。如果是多线程，需要考虑异步的问题，因为玩家可能出于‘正在进入某个游戏的状态’
    // 正在‘离开某个游戏的状态’等等。
    this.gameId = -1;
    this.lastGameId = -1;
    this.tableId = -1;
}

Player.prototype = {
    sendMsg: function (cmd, msg) {
        this.socket.emit(cmd, msg);
    },

     joinTable:function(tableId) {
        this.socket.join(tableId);//socketio的加入房间Api
         Log.info("joint table "+tableId);
    },
    leaveTable: function (tableId) {
        this.socket.leave(tableId);
    },
    //给房间广播
    broadcastMsg: function (tableId, cmd, msg) {
        this.socket.to(tableId).emit(cmd, msg);
    },
    register: function (cmd, callback, scope) {
        let self = this;
        self.socket.on(cmd, function (data) {
            if (callback) {
                callback.call(scope, data, self);
            }
        });
    },
    setTableId: function (id) {
        this.tableId = id;
    },

    setTeam: function (team) {
        this.team = team;
    },
    getCoin: function () {
        return this.coin;
    },
    // 增加coin，都必要使用该接口，
    addCoin: function (coin) {
        // 合法性判断
        // 保持原子性操作
        // 必须使用该接口加钱。（只能加，参数要判断不能为0也不能为负数）
        if (coin <= 0) {
            throw new error('加钱不能是负数');
        }
        this.coin += coin;
        return this.coin;
    },

    // 减少coin，都必要使用该接口，必要判断返回值！如果是true，才是扣钱成功
    subtractCoin: function (coin) {
        // 只能为整数，不能为负数，也不能为0
        // 绝对不能将钱扣到负数
        // 原子操作
        if (this.coin < coin) {
            // 如果是负的，就会越减越多
            return false;
        }
        this.coin -= coin;
        return true;
    },

    // 这个借口只能是充值成功才能调用！！！因为会直接加钱
    recharge: function (coin) {
        // 充值借口
        if (coin <= 0) {
            return;
        }
        this.rechargeCount++;
        this.rechargeTotal += coin;
        this.addCoin(coin);
    },
    setName: function (name) {
        this.name = name;
    },
    getName: function () {
        return this.name;
    },
    setGender: function (gender) {
        this.gender = gender;
    },
    getGender: function () {
        return this.gender;
    },
    setPassword(pwd) {
        this.password = pwd;
    },
    getPassword() {
        return this.password;
    },
    // 修改名字
    modifyName: function (name) {
        if (this.name === name) {
            return;
        }

        this.modifyNameCount++; // 好多游戏不是有第一次修改名字免费，后续收费么，而且这个也算是玩家的行为数据。大数据就靠这个积累
        this.name = name;

        // 写入数据库，告诉客户端修改成功
    },
    // 如果现成的nodejs可以支持继承，可以将一些业务逻辑的代码放到子类中去，HallPlayer = Player.extend();
    onEnterGame: function (gameId) {
        this.gameId = gameId;//当玩家成功进入某个游戏时，可以调用该方法，标记玩家在哪个游戏，当玩家掉线，在连回来时，服务器就知道应该拉回哪个游戏了
    },
    onLeaveGame: function () {
        this.lastGameId = this.gameId;// 也可以记录上个游戏
        this.gameId = -1;
    },
    onEnterTable: function (tableId) {
        this.tableId = tableId;
    },
    onLeaveTable: function () {
        this.tableId = -1;
    }

};
//删除已经出了的牌
Player.prototype.del_poker = function (pokerToDel) {
    for (let i = 0; i < pokerToDel.length; i++) {
        for (let j = 0; j < this.poker.length; j++) {
            if (pokerToDel[i]['showTxt'] === this.poker[j]['showTxt'] &&
                pokerToDel[i]['showType'] === this.poker[j]['showType']) {
                this.poker.splice(j, 1);
            }
        }
    }
};
Player.ID = 0;
Player.GENDER = {
    MALE: 1,
    FEMALE: 2,
    SECRET: 3
};
module.exports = Player;
