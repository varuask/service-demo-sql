const { getCache } = require('../helpers/cacheHelpers');
const ErrorResponse = require('../helpers/ErrorResponse');
const xml = require('xml');

module.exports = async (req, res, next) => {
  try {
    const cachedResults = await getCache(req.cacheKey);
    if (cachedResults) {
      if (req.query.format === 'xml') {
        res.set('Content-Type', 'text/xml');
        return res.send(xml(JSON.parse(cachedResults)));
      }
      if (req.query.format === 'html') {
        res.set('Content-Type', 'text/html');
        return res.send(JSON.parse(cachedResults));
      }
      return res.status(200).json({
        message: 'success',
        data: JSON.parse(cachedResults),
      });
    }
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
};
