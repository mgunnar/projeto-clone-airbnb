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
//alterações Matheus
const reservaSchema = new Schema<reserva>({
    idcasa:      [{ type: SchemaTypes.ObjectId,  ref: 'Casa' }],
    checkin:     {type: Date, required: true},
    checkout:    {type: Date, required: true},
    nome:      {type: String, required: true},
    telefone:      {type: Number, required: true}
}
);

export const ReservaModel = model<reserva>('reserva', reservaSchema, 'reservas');