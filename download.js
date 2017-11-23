const convert = require('./convert')
const https =require('https')
const uuid = require('uuid/v1')
const fs = require('fs')
const path = require('path')
const downloadFile = (url) => {
    const folderName = uuid()
    fs.mkdirSync(folderName)
    const getFile = (url, callback) => {
        https.get(url, (res) => {
            let buffer = ''
            res.on('data', (chunck) => {
                buffer += chunck
            }).on('end', () => {
                callback(null, buffer)
            }).on('error', (err) => {
                callback(err)        
            })
        }).on('error', (err) => {
            callback(err)
        })
    }
    getFile(url, (err, data) => {
        if (err) console.log(`there is an error : ${err}`)
        else {
            fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)            
            fs.writeFileSync(path.join(__dirname, folderName, 'csv.csv'), data)
            convert(folderName)
            console.log(`file downloaded and converted in folder ${folderName}`)
        }
    })
}
// to get url from process arg
downloadFile(process.argv[2])
