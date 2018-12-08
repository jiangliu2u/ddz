let Player = require("./player");
let EventDispatcher = require("./event_dispatcher");
const EventType = require("./event_type");
const Game = require("../game/game");
const md5 = require("md5");
const Log = require("../common/Log");
const Global = require("../game/table_manager");
const ERROR_CODE = require("./error_code");

let Gp;

(function (Gp) {
    function PlayerManager() {

    }

    PlayerManager.prototype = {
        game: null,
        players: {},

        init: function () {
            this.game = new Game(1, "ddz");
            Log.info("create players");
            EventDispatcher.listen(EventType.MSG_DDZ_PLAYER_CONNECTED, this.onCreatePlayer, this);
            EventDispatcher.listen(EventType.MSG_DDZ_PLAYER_DISCONNECT, this.game.onDisconnect, this);


        },
        onCreatePlayer: function (session) {
            //
            Log.warn("onCreatePlayer");
            let player = new Player(session);
            this.players[player.socketId] = player;
            player.register(EventType.MSG_DDZ_ENTER_TABLE, this.game.onMsg);
            player.register(EventType.MSG_DDZ_PLAYER_PREPARED, this.game.onMsg);
            player.register(EventType.MSG_DDZ_DISCARD, this.game.onMsg);
            player.register(EventType.MSG_DDZ_PASS, this.game.onMsg);
            player.register(EventType.MSG_DDZ_ALL_TABLES, this.game.onMsg);
            player.register(EventType.MSG_DDZ_GAME_OVER, this.game.onMsg);
            player.register(EventType.MSG_DDZ_CALL_LANDLORD, this.game.onMsg);
            player.register(EventType.MSG_DDZ_NO_CALL_LANDLORD, this.game.onMsg);
            player.register(EventType.MSG_DDZ_ROB_LANDLORD, this.game.onMsg);
            player.register(EventType.MSG_DDZ_NO_ROB_LANDLORD, this.game.onMsg);
            player.register(EventType.MSG_DDZ_PLAYER_LEAVE, this.game.onMsg);

        },

        packPlayerInfo: function (player) {
            return {name: player.getName(), gender: player.getGender(), coin: player.getCoin()};
        },
        getPlayerById(id) {
            return this.players[id];
        },
        addPlayer(player) {
            this.players[player.socketId] = player;
        },
        getPlayers(ids) {
            let players = [];
            for (let i = 0, len = ids.length; i < len; i++) {
                players.push(this.players[ids[i]]);
            }
            return players;
        },
        getAllPlayers() {
            let players = [];
            for (let i in this.players) {
                players.push(this.players[i]);
            }
            return players;
        },

        initPlayer: function (player) {
            player.setName(this._getRandomName());
            player.setGender("FEMALE");
        },
        _getRandomName: function () {

            let name = '';

            for (let i = 0; i < 6; i++) {
                let rdm = Math.floor(Math.random() * (0x8fa5 - 0x4e00)) + 0x4e00;
                name += String.fromCharCode(rdm);
            }

            return name;
        }
    };
    Gp.PlayerManager = PlayerManager;
})(Gp || (Gp = {}));

module.exports = Gp;
