import mongoose from 'mongoose';


const connectDb = async(req,res)=>{
try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('mongodb connected'+conn.connection.host);
}catch(err){
    console.log('mongodb connection error   '+err)
}
}

export default connectDb;