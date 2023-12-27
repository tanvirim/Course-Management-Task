const mongoose = require('mongoose');

const mongodb = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URI);
    console.log('database connect..');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = mongodb;
