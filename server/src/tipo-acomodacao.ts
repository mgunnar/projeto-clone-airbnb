import { model, Schema } from 'mongoose';
//npm add mongoose

export interface tipoAcomodacao {
    dsacomodacao:      string
}

const tipoAcomodacaoSchema = new Schema<tipoAcomodacao>({
    dsacomodacao:      {type: String, required: true}
}
);

export const TipoAcomodacaoModel = model<tipoAcomodacao>('tipoAcomodacao', tipoAcomodacaoSchema, 'tipoAcomodacaos');