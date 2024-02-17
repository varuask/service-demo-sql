const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { redisClient, connectRedis };
