import 'dotenv/config';import mongoose from 'mongoose';import EmissionFactor from '../models/EmissionFactor.js';import {factors,FACTOR_VERSION} from '../utils/factors.js';
if(!process.env.MONGO_URI){console.error('MONGO_URI is required to seed factor records.');process.exit(1);}
await mongoose.connect(process.env.MONGO_URI);
const source='Illustrative software estimate; authoritative source not verified. Replace before formal reporting.';
const operations=Object.entries(factors).flatMap(([category,items])=>Object.entries(items).map(([subtype,f])=>({updateOne:{filter:{category,subtype,version:FACTOR_VERSION},update:{$set:{category,subtype,label:f.label,unit:f.unit,value:f.factor,version:FACTOR_VERSION,status:'illustrative',source}},upsert:true}})));
await EmissionFactor.bulkWrite(operations);console.log(`Seeded ${operations.length} illustrative emission factors (${FACTOR_VERSION}).`);await mongoose.disconnect();
