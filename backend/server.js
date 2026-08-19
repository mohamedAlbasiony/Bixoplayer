import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import plansRouter from './routes/plans.js';
import contentRouter from './routes/content.js';
import subscriptionRouter from './routes/subscriptions.js';
import chatRouter from './routes/chat.js';
const __dirname=path.dirname(fileURLToPath(import.meta.url));const app=express();
app.use(cors({origin:process.env.FRONTEND_ORIGIN?.split(',')||true,credentials:true}));app.use(express.json({limit:'1mb'}));
app.use('/api/plans',plansRouter);app.use('/api',contentRouter);app.use('/api',subscriptionRouter);app.use('/api/chat',chatRouter);
app.get('/health',(_,res)=>res.json({ok:true,service:'bixoplayer-api'}));
if(process.env.SERVE_FRONTEND==='true'){app.use(express.static(path.join(__dirname,'..')));app.get('*',(_,res)=>res.sendFile(path.join(__dirname,'..','index.html')))}
const port=process.env.PORT||3000;app.listen(port,()=>console.log(`BixoPlayer backend listening on ${port}`));
