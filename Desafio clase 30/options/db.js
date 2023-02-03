require("dotenv").config({ path: "../config/.env" });

const options = {
    client: process.env.MYSQLCLI,
    connection: {
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,   
        port: process.env.MYSQLPORT,
        // password: process.env.MYSQLPASS,
        database: process.env.MYSQLDB
    }         
}


module.exports = { options }



