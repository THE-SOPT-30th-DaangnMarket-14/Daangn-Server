import mongoose from "mongoose";
import config from "../config";
import Chat from "../models/Chat";
import Item from "../models/Item";
import Like from "../models/Like";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI); // 연결

    mongoose.set("autoCreate", true); // 서버 실행 시 Collection 자동 생성

    console.log("Mongoose Connected ...");
    
    Item.createCollection().then(function (collection) {
      console.log("Item created");
    });

    Like.createCollection().then(function (collection) {
      console.log("Like created");
    });

    Chat.createCollection().then(function (collection) {
      console.log("Chat created");
    });
    
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
