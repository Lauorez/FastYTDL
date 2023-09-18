const express = require('express')
const ytdl = require('youtube-dl-exec')
const path = require('path')

const PORT = 8080
const app = express()

app.use(express.static(path.resolve("static")))
//app.use(express.static(path.resolve("download")))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.resolve("static", "index.html"))
})

app.post('/get_by_url', (req, res) => {
    var url = req.body.url
    var type = req.body.type
    var filename = path.resolve("static", "download", url.replace("https://www.youtube.com/watch?v=", "").replace("https://youtu.be/", "").replace('/', '_').replace(':', '_').replace('?', '_').replace('=', '_').replace('&', '_') + type)
    
    switch (type) {
        case ".mp4":
            ytdl(url, {
                noCheckCertificates: true,
                noWarnings: true,
                addHeader: [
                    'referer:youtube.com',
                    'user-agent:googlebot'
                ],
                formatSort: "res,ext:mp4:m4a",
                recode: "mp4",
                output: filename
            }).then(() => {
                res.send({
                    filename: path.basename(filename)
                })
            })
            break;
        case ".mp3":
            ytdl(url, {
                noCheckCertificates: true,
                noWarnings: true,
                addHeader: [
                    'referer:youtube.com',
                    'user-agent:googlebot'
                ],
                audioFormat: "mp3",
                audioQuality: "0",
                recode: "mp3",
                output: filename
            }).then(() => {
                res.send({
                    filename: path.basename(filename)
                })
            })
            break;
    }
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}!`)
})