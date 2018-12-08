const Log =require("./common/Log");
const MyServer = require('./web/server');
const Global = require("./game/table_manager");
const Gp = require("./common/player_manager");


async function init() {
    let tableManager = new Global.TableManager();
    let playerManager = new Gp.PlayerManager();

    global.tableManager = tableManager;
    await global.tableManager.init();
    global.playerManager = playerManager;
    await global.playerManager.init();
    let port = 3001;
    let myServer = new MyServer(port);
    myServer.start();
    Log.info("服务器已经启动")
}

// init
init();




