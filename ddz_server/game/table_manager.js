const Table = require('./table');
const EventDispatcher = require("../common/event_dispatcher");


let Global;

(function(Global) {

    function TableManager() {

    }

    /**
     * 这是一个桌子管理器
     */
    TableManager.prototype = {
        ID: 0,
        _tables: {},
        // 可以在app.js中初始化
        init: function () {
            // 这里可以在服务器启动时直接创建出很多桌子。
            for (let i = 0; i < 100; i++) {
                let type = 0, id = this._generatedId();
                let table = this._createTable(type, i);
                this.addTable(table);
            }


        },
        addTable: function (table) {
            // 添加一个桌子
            this._tables[table._id] = table;
        },

        getTableById: function (id) {
            return this._tables[id];
        },

        getTableByRandom: function () {
            // return a table;
        },
        getAllTables:function () {
            var tables = [];
            for (let k in this._tables){
                tables.push(this._tables[k]._id)
            }
            return tables;
        },
        _createTable: function (type, id) {
            return new Table(type, id);
        },

        _onEnterTable: function (tableId, playerId) {
            // EventDispatcher.trigger(EventType.MSG_DDZ_ENTER_TABLE,tableId);

        },
        _generatedId: function () {
            /**
             * 其实可以封住一个IBaseElement。这个类提供这个方法。任何需要唯一ID的类都从这个类继承
             */
            let id = TableManager.ID;
            TableManager.ID++;	// 这种做法仅限于是单线程！！！！
            return id;
        }

    };

    Global.TableManager = TableManager;

})(Global || (Global = {}));

module.exports = Global;