import mongoose from 'mongoose';
const schema=new mongoose.Schema({category:{type:String,required:true},subtype:{type:String,required:true},label:{type:String,required:true},unit:{type:String,required:true},value:{type:Number,required:true,min:0},version:{type:String,required:true},status:{type:String,enum:['illustrative','verified'],default:'illustrative'},source:{type:String,required:true}},{timestamps:true});
schema.index({category:1,subtype:1,version:1},{unique:true});
export default mongoose.model('EmissionFactor',schema);
