import { Casa } from '../entidades/casa';
import { CasaModel } from './casaModel';


export class CasaRepositorio {
    static async criar(casa: Casa): Promise<Casa> {
        return CasaModel.create(casa);
    }
    static async buscar(): Promise<Casa[]> {
        return CasaModel.find().exec();
    }
    static async buscarPorCodigo(codigo: string): Promise<Casa|null> {
        return CasaModel.findOne({ codigo: codigo }).exec();
    }
}


/*
export async function criar(Casa: Casa): Promise<Casa> {
    return CasaModel.create(Casa);
}
*/
