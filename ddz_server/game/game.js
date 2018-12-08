const EventType = require("../common/event_type");
const EventDispatcher = require("../common/event_dispatcher");
const PlayerManager = require("../common/player_manager");
const Log =require("../common/Log");
function Game(id, gameName) {
    this.gameId = id;// 1 -> ddz
    this.gameName = gameName;
}

let proto = Game.prototype;

proto.onMsg = function (msg) {

    let tableId;
    if (msg['tableId']) {
        tableId = msg['tableId'];
    } else {
        if (msg["playerId"]) {
            let player = global.playerManager.getPlayerById(msg["playerId"]);
            tableId = player.tableId;
        }

    }

    let table = global.tableManager.getTableById(tableId);

    if (table) {
        table.onMsg(msg);
    } else {

        Log.warn("找不到桌子" + msg["tableId"]);
        Log.error(msg);
    }
};
proto.onDisconnect=function(data){
    let player = global.playerManager.getPlayerById(data.id);
    let tableId = player.tableId;
    Log.warn("game on disconnect");
    if(tableId!==undefined){
        let table = global.tableManager.getTableById(tableId);
        if (table) {
            table.onDisconnect(data);
        } else {

            Log.warn("从大厅断开");
        }
    }else {
        Log.warn("不在房间断开");
    }

},
// 其他接口
module.exports = Game;

