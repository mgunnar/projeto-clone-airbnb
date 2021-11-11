import { connect, disconnect } from 'mongoose';
import { CasaModel } from './casa';
import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import bodyparser, {json} from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';

//npm add express morgan nodeman ejs body-parser dotenv mongoose express-validator cors errorhandler passport jsonwebtoken passport-local passport-jwt
//npm i @types/express --save-dev
//npm i node-fetch@cjs
//npm i @types/node-fetch@2.5.12 --save-dev
//npm i ts-node --save-dev
//npm i @types/node -D
//npm i supertest
//npm i jest
//npm i express-validator

import { MongoParseError } from 'mongoose/node_modules/mongodb';
import { Result } from 'express-validator';
async function main(){

    try{
        const app = express();
        app.use(express.json());
        app.use(cors());
        app.use(morgan('tiny'));
        app.use(bodyparser.urlencoded({extended:true}));
        
        dotenv.config({path:'.env'});
        const port = process.env.port || 3000;

        const url = 'mongodb+srv://adminprojeto:senhasenha.123@banco-projeto-airbnb.mw94s.mongodb.net/bancocloneairbnb00?retryWrites=true&w=majority';
        //const url = 'mongodb+srv://fabio:2010@cluster0.u9ema.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        //const url = 'mongodb://localhost:27017';
        //mongodb+srv://alunos:alunos@cluster0-XXXXX.azure.mongodb.net/test?retryWrites=true&w=m

         await connect(url);
         console.log('Conectado!');
         app.use(json());
         app.listen(port, ()=>{
            console.log(`Servidor na porta ${port}`);
        })

        app.post("/insertCasa/", async (req, res) => {
            const local = req.body.local;
            const cidade = req.body.cidade;
            const quartos = req.body.quartos;
            const camas = req.body.camas;
            const banheiros = req.body.banheiros;
            const hospedes = req.body.hospedes;
    
            const doc = await CasaModel.create({
                local: local,
                cidade: cidade,
                quartos: quartos,
                camas: camas,
                banheiros: banheiros,
                hospedes: hospedes
             });
             
         console.log('Inserido!');
         console.log(doc);
         res.send(`Inserção Casa: Local: ${req.body.local}, Cidade: ${req.body.cidade}, Quartos: ${req.body.quartos}`)
         });
    
        app.get("/readCasa/", async (req, res)=>{
            CasaModel.find({}, (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
         });
                         
         console.log('GetTodos!');
         console.log(Result);
         });
         
       
         app.get("/readLocal/", async (req, res)=>{
            CasaModel.find({}, (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
            });
                   
            /*
            export function getAloComParametro(req: Request, res: Response) {
            const nome = req.params.nome;
                res.send(`Alô, ${nome}!`);
            }
            
            
            */
         console.log('GetTodos!');
         console.log(Result);
         });
        
         /*
         //1 - INSERIR
         const documentoInserido = await ProdutoModel.create({
             nome: 'Alface',
             cost: 0.89,
             category: 'Verdura'
         });

         console.log('Inserido!');
         console.log(documentoInserido);

         //2 - BUSCAR
         const produtos = await ProdutoModel.find().exec();
         console.log('Resultado da consulta Exec: ')
         console.log(produtos);

         const produtos2 = await ProdutoModel.find().lean();
         console.log('Resultado da consulta Lean: ')
         console.log(produtos2);

         const numero = await ProdutoModel.where('cost').lte(10).countDocuments().exec;
         console.log('Resultado da Consulta Total DoC');
         console.log(numero);

         //3 - Alterar
         const documento = await ProdutoModel.findById('6169c9130052a4d695b28229').exec();
         if (documento!= null){
             documento.nome = 'Repolho'
             documento.cost = 3.00;
             documento.category = 'Verdura';
             const documentoatualizado = await documento.save();
             console.log('Resultado da Alteração');
             console.log(documentoatualizado);
         }
         
         //4 - Excluir
         const documentox = await ProdutoModel.findById('169c9130052a4d695b28229').exec();
         if (documentox != null){
             const documentoRemovido = await documentox.remove();
             console.log('Resultado da Exclusão');
             console.log(documentoRemovido);

         }
        



         app.listen(port, ()=>{
             console.log(`Servidor na porta ${port}`);
         })

         */

    }catch(error){
        console.log('Falha de acesso!');
        console.log(error);

    }finally{
        //await disconnect();
       // console.log('Desconectado do mongodb Atlas!');
    }
}

main();
