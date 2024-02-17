const pool = require('../config/database');
const ErrorResponse = require('../helpers/ErrorResponse');
const xml = require('xml');
const { setCache } = require('../helpers/cacheHelpers');

exports.topUsers = async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { year, month, transaction_id, amount, timestamp } = req.query;
    console.log(req.query, 'req-query');
    const requiredFields = [];
    if (transaction_id === 'true') {
      requiredFields.push(', transaction_id');
    }
    if (amount === 'true') {
      requiredFields.push(', amount');
    }
    if (timestamp === 'true') {
      requiredFields.push(', timestamp');
    }
    const readQuery = `SELECT user_id ${requiredFields.join(
      ''
    )} FROM transactions WHERE timestamp LIKE '${year}-${month}%' ORDER BY amount DESC LIMIT 100`;
    const [results] = await conn.query(readQuery);
    const cachingKey = `topUsers_${year}_${month}_${transaction_id}_${amount}_${timestamp}`;
    await setCache(cachingKey, JSON.stringify(results));
    if (req.query.format === 'xml') {
      res.set('Content-Type', 'text/xml');
      return res.send(xml(results));
    }
    if (req.query.format === 'html') {
      res.set('Content-Type', 'text/html');
      return res.send(results);
    }
    return res.status(200).json({
      message: 'success',
      data: results,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse(err.message, 500));
  } finally {
    if (conn) {
      conn.release();
    }
  }
};

exports.days = async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { year } = req.query;
    const readQuery = ``;
    const results = await conn.query(readQuery);
    return res.status(200).json({
      message: 'success',
      data: results,
    });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
