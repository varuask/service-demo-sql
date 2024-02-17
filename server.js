const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { connectRedis } = require('./config/cache');
const transactionsRouter = require('./routers/transactions');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.get('/', (req, res) => {
  return res.send('hello-world');
});

app.use('/api/v1/transactions', transactionsRouter);

app.use(errorHandler);

process.on('unhandledRejection', (reason, promise) => {
  console.warn(reason);
});

const startServer = async () => {
  try {
    await connectRedis();
    app.listen(process.env.APP_PORT, () => {
      console.log(
        `service is live and listening on port ${process.env.APP_PORT}`
      );
    });
  } catch (err) {
    console.log(`server could not start due to ${err.message}`);
  }
};

startServer();
