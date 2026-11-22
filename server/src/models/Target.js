import mongoose from 'mongoose';
const schema = new mongoose.Schema({organization:{type:mongoose.Schema.Types.ObjectId,ref:'Organization',required:true,index:true},year:{type:Number,required:true},baselineKg:{type:Number,required:true,min:0},targetReductionPercent:{type:Number,required:true,min:0,max:100}},{timestamps:true});
schema.index({organization:1,year:1},{unique:true});
export default mongoose.model('Target',schema);
