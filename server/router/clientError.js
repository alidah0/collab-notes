module.exports = (req, res) => {
  res.status(404).send({ message: 'Page not found!', statusCode: 404 });
};
