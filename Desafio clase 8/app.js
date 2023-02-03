const express = require('express')
const Libreria = require('./libs/libreria')
const { Router } = express;
const validateData = require("./middelwares/validateData");

const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


const router = Router();
const libreria = new Libreria(__dirname + "/data/libros.json")

router.get("/", (req, res) => {
    return res.json(libreria.list)
})

router.get("/:id", validateData.validateId, (req, res) => {
    let id = req.params.id
    return res.json(libreria.find(id))
})

router.post("/", validateData.validatePostBody, (req, res) => {
    let obj = req.body
    return res.json(libreria.insert(obj))
})

// router.put("/:id", validateData.validateId, validateData.validatePutBody, (req, res) => {
//     let obj = req.body
//     let id = req.params.id
//     return res.json(libreria.update(id, obj))
// })

router.put("/:id", validateData.validateId, validateData.validatePutBody, (req, res) => {
    const { title, author, pages, thumbnail } = req.body;
    let obj = { title, author, pages, thumbnail }
    let id = req.params.id
    return res.json(libreria.update(id, obj))
})

router.delete("/:id", validateData.validateId, (req, res) => {
    let id = req.params.id
    return res.json(libreria.delete(id))
})


app.use("/api/productos", router)
app.use(express.static('./views'))

app.listen(8080)