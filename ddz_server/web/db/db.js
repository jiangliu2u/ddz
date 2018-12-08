const Knex = require("knex");
const Log = require("../../common/Log");
const Config = require("../config");
let db;
let knex = Knex({
    client: 'mysql',
    connection: {
        host: Config.mysql.host,
        user: Config.mysql.user,
        password: Config.mysql.password,
        database: Config.mysql.database
    }
});
function init() {
    return knex.schema.hasTable("users").then(exists => {
        if (!exists) {
            return knex.schema.createTable('users', (table) => {
                table.increments('id').primary();
                table.string('username').notNullable();
                table.string('password').notNullable();
                table.integer('coin').defaultTo(9999);
                table.dateTime('join_date');
                table.dateTime('last_login_date');
                Log.info("创建表users成功!");
            })
        }
    }).catch(err => {
            Log.error(err);
            return;
        }
    )
}
init()
module.exports = knex;