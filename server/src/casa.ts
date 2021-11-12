import { model, Schema } from 'mongoose';
//npm add mongoose

export interface Casa {
    estado: string;
    anfitriao: string;
    local:      string;
    cidade:     string;
    quartos:    number;
    camas:      number;
    banheiros:  number;
    hospedes:   number;
}

const CasaSchema = new Schema<Casa>({
    estado:      {type: String, required: true},
    anfitriao:     {type: String, required: true},
    local:      {type: String, required: true},
    cidade:     {type: String, required: true},
    quartos:    {type: Number, required: true},
    camas:      {type: Number, required: true},
    banheiros:  {type: Number, required: true},
    hospedes:   {type: Number, required: true}
});

export const CasaModel = model<Casa>('Casa', CasaSchema, 'casas');
