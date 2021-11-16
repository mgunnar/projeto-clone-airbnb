import { model, Schema } from 'mongoose';

export interface Casa {
    //_id? : string;
    estado:     string;
    anfitriao:  string;
    local:      string;
    cidade:     string;
    quartos:    number;
    camas:      number;
    banheiros:  number;
    hospedes:   number;
    moradia:    string;
}

const CasaSchema = new Schema<Casa>({
 //   _id: {type: String, required: true},
    estado:     {type: String, required: true},
    anfitriao:  {type: String, required: true},
    local:      {type: String, required: true},
    cidade:     {type: String, required: true},
    quartos:    {type: Number, required: true},
    camas:      {type: Number, required: true},
    banheiros:  {type: Number, required: true},
    hospedes:   {type: Number, required: true},
    moradia:    {type: String, required: true}
});

export const CasaModel = model<Casa>('Casa', CasaSchema, 'casas');
