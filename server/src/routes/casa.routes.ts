import { Router } from 'express';
import * as CasaController from '../controllers/casa.controller';

export const router = Router();
export const path = '/casa';

//GET /conversor?moeda=:moeda&quantidade=:quantidade
router.get(`${path}`, CasaController.getCasa);