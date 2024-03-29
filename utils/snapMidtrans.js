// eslint-disable-next-line import/no-extraneous-dependencies
const midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: false,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

module.exports = snap;
