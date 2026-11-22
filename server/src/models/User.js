import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name:{type:String,required:true,trim:true,maxlength:100},email:{type:String,required:true,lowercase:true,trim:true,unique:true},passwordHash:{type:String,required:true,select:false},organization:{type:mongoose.Schema.Types.ObjectId,ref:'Organization',required:true},role:{type:String,enum:['admin','member'],default:'admin'} },{timestamps:true});
export default mongoose.model('User',schema);
