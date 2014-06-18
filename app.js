/*
nodejs chat
v0.1
by wak hehe jek
@node.js indonesia
*/
var app = require('http').createServer()
  , io = require('socket.io').listen(app)
  , fs = require('fs')
 
app.listen(8888);
 
/*function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
 
    res.writeHead(200);
    res.end(data);
  });
}*/
var usernames = {};
 
io.sockets.on('connection', function (socket) {
    socket.on('adduser', function(username){
        if(username != 'null'){
            socket.username = username;
            usernames[username] = username;
          //  socket.emit('receive', 'SERVER', {text: '<span class="server">you have connected</span>'});
            socket.broadcast.emit('receive', 'SERVER', {text: '<span class="server">'+username + ' has connected</span>'});
          //  socket.emit('updateusers', usernames);
        }
    });
 
    socket.on('send', function (data) {
    socket.broadcast.emit('receive_text', socket.username, { text: data.text });
  });
  socket.on('typing',function(data){
    socket.broadcast.emit('istyping',{text: data.text});
 
  });
 
  socket.on('disconnect', function(){
    delete usernames[socket.username];
    socket.emit('updateusers', usernames);
    socket.broadcast.emit('receive', 'SERVER', {text: '<span class="server">'+socket.username + ' has disconnected</span>'});
  });
});