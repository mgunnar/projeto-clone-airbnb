import { Casa } from '../entidades/casa';
import { model, Schema } from 'mongoose';
//npm add mongoose

const CasaSchema = new Schema<Casa>({
    local:      {type: String, required: true},
    cidade:     {type: String, required: true},
    quartos:    {type: Number, required: true},
    camas:      {type: Number, required: true},
    banheiros:  {type: Number, required: true},
    hospedes:   {type: Number, required: true}
});

export const CasaModel = model<Casa>('Casa', CasaSchema, 'casas');
