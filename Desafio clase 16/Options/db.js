const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',   
        //port: '3308',    
        password: 'secret',
        database: 'ecommerce'
    }
          
}

module.exports = { options }