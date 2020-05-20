const users = [];

const addUser = ({ id, nameq, boardname }) => {
  const user = { id, nameq, boardname };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  return index !== -1 && users.splice(index, 1)[0];
};

const getUsersInRoom = (boardname) =>
  users.filter((user) => user.boardname === boardname);

module.exports = { addUser, removeUser, getUsersInRoom };
