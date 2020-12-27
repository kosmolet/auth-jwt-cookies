const mongoose = require("mongoose");

const envFiles = {
  development: ".env",
  test: ".env.test",
};

require("dotenv").config({ path: envFiles[process.env.NODE_ENV] });

const connectToDB = async () => {
  const mongoConnectionString = process.env.MONGO_URI;
  try {
    const opts = {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    };
    await mongoose.connect(mongoConnectionString, opts);
    logger.debug({ mongoConnectionString });
  } catch (err) {
    logger.error(`Fail to connect with database ${mongoConnectionString}`);
    process.exit(1);
  }
};
module.exports = connectToDB;
