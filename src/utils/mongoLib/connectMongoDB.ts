import mongoose from "mongoose";

if (!process.env.MONGODB_URL) {
  throw new Error("please add MONGODB_URL TO .env file");
}

const MONGODB_URL = process.env.MONGODB_URL;

async function connectMongoDB() {
  const options = {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const mongoPromise = mongoose
    .connect(MONGODB_URL, options)
    .then((mongoose) => {
      console.log('DB connected successfully..')
      return mongoose;
    })
    .catch((error) => {
      console.log('Error while connecting to the DB: ', error)
    });

  const connection = await mongoPromise;
  return connection;
}

export default connectMongoDB;
