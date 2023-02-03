import app from './server.js'

const PORT = 5000

const server = app.listen(PORT, () => {
    console.log("SERVER ON")
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
}) 


server.on('error', error => console.log(`Error en servidor ${error}`))


