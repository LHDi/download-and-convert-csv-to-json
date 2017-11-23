module.exports = (folder) => {
    const fs = require('fs')
    const path = require('path')
    let csv = fs.readFileSync(path.join(__dirname, folder, 'csv.csv'), 'utf8').split(/\n|\r/)
    let titles = csv.shift().split(',')
    let json = ''
    for(let i in csv) {
        if (csv[i] === '') csv.splice(i, 1) 
    }
    csv.pop()
    let i = 0
    const convert = (obj, person) => {
        person = person.split(',')
        for (let i in titles) { 
            obj[titles[i]] = person[i]
        }
        json += `\n    ${JSON.stringify(obj)}`
        if (i != csv.length) json += `, `
    }
    for(let person of csv) {
        i++
        convert({}, person)
    }
    
    fs.writeFileSync(path.join(__dirname, folder, 'data.json'), `[${json}\n]`)
}