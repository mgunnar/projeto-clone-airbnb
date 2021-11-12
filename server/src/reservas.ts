import { model, Schema, SchemaTypes } from 'mongoose';
import {Casa} from './casa';
//npm add mongoose

//alterações Matheus
export interface reserva {
    //idcasa:      Casa;
    idcasa:      number;
    checkin:     Date;
    checkout:    Date;
    nome:      string;
    telefone:  number
}
//alterações Matheus
const reservaSchema = new Schema<reserva>({
    //idcasa:      { type: SchemaTypes.ObjectId, ref: 'Casa', required: true },
    idcasa:     {type: Number, required: true},
    checkin:     {type: Date, required: true},
    checkout:    {type: Date, required: true},
    nome:      {type: String, required: true},
    telefone:      {type: Number, required: true}
}
);

export const ReservaModel = model<reserva>('reserva', reservaSchema, 'reservas');