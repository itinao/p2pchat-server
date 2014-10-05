/**
 *
 */
var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 9000, path: '/myapp'});
var connected = [];
var rooms = [];
server.on('connection', function(id) {
  console.log("connection");
  console.log(id);
  connected.push(id);
});

server.on('disconnect', function(id) {
  console.log("disconnection");
  console.log(id);
  connected.some(function(v, i){
    if (v == id) {
      connected.splice(i, 1);
    }
  });
});

/** ???
server._wss.on('message', function (a) {
console.log("con");
});
*/

// これでServerとして使える模様
server._app.get('/getConnected', function (req, res) {
  return res.json(connected);
});
server._app.get('/getRooms', function (req, res) {
  return res.json(rooms);
});
server._app.get('/createdRoom', function (req, res) {
  var query = req.query;
  console.log(query);
  rooms.push(query.roomName);
  return res.json(true);
});

/**
for (_server in server) {
  console.log(_server);
  for (__server in server[_server]) {
    console.log("  => " + __server);
  }
}
*/
