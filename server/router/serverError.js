module.exports = (err, req, res, next) => {
  res.status(500).send({ message: 'Internal Server Error!', statusCode: 500 });
};
