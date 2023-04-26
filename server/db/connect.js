const mongoose = require("mongoose");

const connectDb = (uri) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
