let _io;
const userSockets = {};
const sendTo = (id, message)=> {
  const socket = userSockets[id];
  if(socket){
    socket.emit('message', message);
  }
  else {
    console.log('no socket found');
  }
};
const setup = (io, sessionMiddleware) => {
  _io = io;



  io.use((socket, next)=> {
    sessionMiddleware(socket.request, {}, next);
  });

  io.use((socket, next)=> {
    console.log('handshake');
    if(socket.request.session.passport){
      userSockets[socket.request.session.passport.user] = socket;
    }
    next();
  });
  
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

module.exports = {
  sendTo,
  setup,
  getIO: ()=> _io
};
