import {Router} from 'express';import {plans} from '../models/plans.js';const r=Router();r.get('/',(_,res)=>res.json({plans}));export default r;
