import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator'
const { isEmail } = validator

const UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:[true,'email is required'],
    trim:true,
    unique: true,
    lowercase: true,
    validate:[isEmail,'enter valid email']
  },
  password:{
    type:String,
    required:[true,'Password is required'],
    minlength:[5,'Password must be at least 5 characters']
  }
})

UserSchema.pre('save',async function() {
  const salt = await bcrypt.genSalt(8)
  this.password = await bcrypt.hash(this.password,salt)
  console.log('user create and save',this);

})

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}


export default mongoose.model('User',UserSchema)
