const { localStorage } = require('../localStorage');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New socket connection');

    let currentCode = null;

    socket.on('move', function (move) {
      console.log('move detected');
      console.log(localStorage.getItem(currentCode));

      io.to(currentCode).emit('newMove', move);
    });

    socket.on('joinGame', function (data) {
      currentCode = data.code;
      socket.join(currentCode);
      if (!localStorage.getItem(currentCode)) {
        localStorage.setItem(currentCode, true);

        return;
      }

      console.log(
        'game started, code:',
        currentCode,
        localStorage.getItem(currentCode),
      );
      io.to(currentCode).emit('startGame');
    });

    socket.on('disconnect', function () {
      console.log('socket disconnected');

      if (currentCode) {
        io.to(currentCode).emit('gameOverDisconnect');
        localStorage.removeItem(currentCode);
      }
    });
  });
};
