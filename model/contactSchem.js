import mongoose from "mongoose";
import mongPage from "mongoose-paginate-v2"


const userSchem = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  }
})


userSchem.plugin(mongPage)

const connect = mongoose.model('contacttest_1' , userSchem)

export default connect