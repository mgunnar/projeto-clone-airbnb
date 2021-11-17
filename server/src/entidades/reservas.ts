import { ObjectId } from 'bson';
import { model, Schema, SchemaTypes } from 'mongoose';
import {Casa} from './casa';
//npm add mongoose

//alterações Matheus
export interface reserva extends Casa {
    idcasa:      Casa[];
    checkin:     Date;
    checkout:    Date;
    nome:      string;
    telefone:  number
}
