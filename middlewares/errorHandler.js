module.exports = (err, req, res, next) => {
  const message = err.message || 'internal server error';
  const code = err.code || 500;
  return res.status(code).json({
    operation: 'failed',
    message,
  });
};
