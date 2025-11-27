import mongoose from "mongoose";

const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('mongo db is connect');
  }catch(err){
    console.log('mongo db failed',err.message);
    process.exit(1)
  }
}
export default connectDB