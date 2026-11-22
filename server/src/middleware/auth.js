import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function auth(req,res,next){
  const token=req.cookies?.ct_session||req.headers.authorization?.replace(/^Bearer\s+/i,'');
  if(!token)return res.status(401).json({error:'Please sign in.'});
  let payload;
  try{payload=jwt.verify(token,process.env.JWT_SECRET);}catch{return res.status(401).json({error:'Session expired. Please sign in again.'});}
  try{
    const user=await User.findById(payload.sub).populate('organization');
    if(!user)return res.status(401).json({error:'Session expired. Please sign in again.'});
    req.user=user;next();
  }catch(error){next(error);}
}
