var net = require('net')
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

app.use(express.static(__dirname))
app.get('/', function(req, res) {
    res.redirect("/index.html")
})

io.sockets.on('connection', function (client) {
    var chat = net.connect(1234)
    chat.on('data', function(data) {
            client.send(data)
    })

    client.on('message', function (msg) {
        chat.write(msg)
    }).on('disconnect', function() {
        chat.end()
    })
})

server.listen(8088)
console.log('server running on http://localhost:8088')