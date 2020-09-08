const socketIO = require('socket.io');

const { addUser, removeUser, getUsersInRoom } = require('./users');
const Board = require('../database/models/Board');

const runSockets = (server) => {
  const io = socketIO(server);
  io.on('connect', (socket) => {
    socket.on('join', async ({ nameq, boardname }, callback) => {
      const { error, user } = addUser({ id: socket.id, nameq, boardname });
      if (error) return callback(error);

      await Board.find({ title: boardname }, (err, rows) => {
        if (err) {
          console.log('error');
        }

        socket.join(user.boardname);
        socket.broadcast
          .to(user.boardname)
          .emit('notification', `${user.nameq} has joined!`);
        io.to(user.boardname).emit('boardData', {
          userss: getUsersInRoom(user.boardname),
          data: rows[0].notes,
        });
      });

      return callback();
    });

    socket.on('createPost', ({ board, oldNotes }) => {
      Board.updateOne({ title: board }, { notes: oldNotes }).then(() => {
        io.to(board).emit('createPost', oldNotes);
      });
    });

    socket.on('delete', ({ board, newNotesArray }) => {
      Board.updateOne({ title: board }, { notes: newNotesArray }).then(() => {
        io.to(board).emit('delete', newNotesArray);
      });
    });
    socket.on('update', ({ board, oldNotes }) => {
      Board.updateOne({ title: board }, { notes: oldNotes }).then(() => {
        io.to(board).emit('update', oldNotes);
      });
    });

    socket.on('disconnect', async () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.boardname).emit('notification', `${user.nameq} has left.`);
        await Board.find({ title: user.boardname }, (err, rows) => {
          if (err) {
            console.log('eroor');
          }
          io.to(user.boardname).emit('boardData', {
            userss: getUsersInRoom(user.boardname),
            data: rows[0].notes,
          });
        });
      }
    });
  });
};

module.exports = runSockets;
