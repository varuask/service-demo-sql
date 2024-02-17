const { redisClient } = require('../config/cache');

const setCache = async (key, value) => {
  try {
    await redisClient.setEx(key, process.env.CACHE_TTL, value);
  } catch (err) {
    throw err;
  }
};

const getCache = async (key) => {
  try {
    const result = await redisClient.get(key);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { getCache, setCache };
