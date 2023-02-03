const randoms = (min = 1, max = 1000) => Math.floor(Math.random() * (max - min + 1) + min)

const list = () => {
    
    var cant = parseInt(process.argv.slice(2)) || 100000000

    result = {}
   
    for (let i = 0; i < cant; i++) {
        const num = randoms()
        if(num in result) result[num]++
        
        else result[num] = 1
    }

    return result
    
}
process.send(list())


