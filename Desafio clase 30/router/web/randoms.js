const randomsWebRouter = require("express").Router();
const { fork } = require("child_process");

//RANDOM

randomsWebRouter.get('/randoms/:n?', (req, res) => {

    var n = Number(req.params.n) 
   
    const forked = fork('./utils/random.js', [n])
      
     console.log('Init proccess Dad')
     
     forked.send('start')
     forked.on('message', msg => {
         res.end(`Random List ${JSON.stringify(msg)}`)
     })
   
   })

   randomsWebRouter.get("/randoms", (req, res) => {
    const num = req.query.cant || 100;
    const randoms = fork('./utils/random.js', [num]);
    
    randoms.send("start");
  
    randoms.on("error", (err) => {
      console.log(`Error en child process 'random' ${err}`);
    });
  
    randoms.on("message", (obj) => {
      return res.json(obj);
    });
  });



   module.exports = randomsWebRouter

