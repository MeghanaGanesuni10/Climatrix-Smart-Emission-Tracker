import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name:{type:String,required:true,trim:true,maxlength:120}, annualReductionTarget:{type:Number,default:0,min:0}, createdAt:{type:Date,default:Date.now} },{timestamps:true});
export default mongoose.model('Organization',schema);
