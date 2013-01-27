var clients = []
var index = 1

require('net').createServer(function(client) {
    clients.push(client)
    client.name = 'client_' + index++
    client.on('end', function() {
        broadcast('*' + client.name + ' gone\n')
        clients.slice(clients.indexOf(client,1))
    }).on('data', function(msg) {
        broadcast(client.name + '> ' + msg)
    }).on('error', function(err) {
        console.log(err)
    }).write('* hello ' + client.name + '\n')
    broadcast('* ' + client.name + ' entered\n')

    function broadcast(msg) {
        clients.forEach(function(receiver) {
            if (client !== receiver) receiver.write(msg);
        })
        console.log(msg)        
    }
}).listen(1234)
console.log('tcp chat server listening on port 1234')