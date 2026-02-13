import mongoose, { mongo } from "mongoose";

const userFileSchema = mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
});


const uploadFile  = mongoose.model('file' , userFileSchema)

export default uploadFile