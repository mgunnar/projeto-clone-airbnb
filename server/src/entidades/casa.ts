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
