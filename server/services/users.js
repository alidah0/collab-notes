const users = [];

const addUser = ({ id, nameq, board }) => {
  const user = { id, nameq, board };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  return index !== -1 && users.splice(index, 1)[0];
};

const getUsersInRoom = (board) => users.filter((user) => user.board === board);

module.exports = { addUser, removeUser, getUsersInRoom };
