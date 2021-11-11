import { model, Schema } from 'mongoose';
//npm add mongoose

export interface tipoAcomodacao {
    local:      string;
    cidade:     string;
    quartos:    number;
    camas:      number;
    banheiros:  number;
    hospedes:   number;
}

const tipoAcomodacaoSchema = new Schema<tipoAcomodacao>({
    local:      {type: String, required: true},
    cidade:     {type: String, required: true},
    quartos:    {type: Number, required: true},
    camas:      {type: Number, required: true},
    banheiros:  {type: Number, required: true}, 
    hospedes:   {type: Number, required: true}
}
);

export const tipoAcomodacaoModel = model<tipoAcomodacao>('tipoAcomodacao', tipoAcomodacaoSchema, 'tipoAcomodacaos');
