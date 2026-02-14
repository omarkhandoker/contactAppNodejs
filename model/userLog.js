import mongoose from "mongoose";

const userLogInfo = mongoose.Schema({
  full_name: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  userPassword: {
    type: String,
    require: true,
  },
});

const logModel = mongoose.model('userLog', userLogInfo)

export default logModel;

