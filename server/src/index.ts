import { connect, disconnect } from 'mongoose';
import { ObjectId }            from 'mongodb';
import express, { request, response } from 'express';
import cors                    from 'cors';
import bodyparser, {json}      from 'body-parser';
import dotenv                  from 'dotenv';
import morgan                  from 'morgan';
import { CasaModel }           from './repositorio/casaModel';
import { ReservaModel }        from './repositorio/reservasModel';
import { Result }              from 'express-validator';
import * as uploadUser         from './middlewares/uploadImage';

/*PACOTES: 
  npm i formidable
  npm i @types/formidable --save-dev
  npm add express morgan nodeman ejs body-parser dotenv mongoose express-validator cors errorhandler passport jsonwebtoken passport-local passport-jwt
  npm i @types/express --save-dev
  npm i node-fetch@cjs
  npm i @types/node-fetch@2.5.12 --save-dev
  npm i ts-node --save-dev
  npm i @types/node -D
  npm i supertest
  npm i jest
  npm i express-validator
*/

/*REFERÊNCIAS: 
  https://www.thecodebuzz.com/mongodb-query-with-like-start-with-or-end-with-guidelines/
*/

async function main(){
    try{
        const app = express();
        app.use(express.json());
        //todas origens
        app.use(cors({
          origin: "*",
        }));

        app.use(morgan('tiny'));
        app.use(bodyparser.urlencoded({extended:true}));        
        dotenv.config({path:'.env'});
        const port = process.env.port || 3000;
        const url = process.env.MONGO_URL || '';
        const server = process.env.DB_HOST;
        
         await connect(url);
         console.log('Conectado!');
         app.use(json());
         app.listen(port, ()=>{
            console.log(`Servidor na porta ${port}`);
        })

        app.use((req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
          res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
          app.use(cors());
          next();
        });
         
        app.post("/upload-image/",uploadUser.default.single('image'), async (req, res) => {

          if (req.file) {
              return res.json({
                  erro: false,
                  mensagem: "Upload realizado com sucesso!"
              });
          }
      
          return res.status(400).json({
              erro: true,
              mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
          });
        });

        app.post("/insertReserva/", async (req, res) => {
            const idcasa = req.body.idcasa;
            const checkin = req.body.checkin;
            const checkout = req.body.checkout;
            const nome = req.body.nome;
            const telefone = req.body.telefone; 
            
            //let casa = await CasaModel.findById({_id: new ObjectId(idcasa)});
            const  id = new ObjectId(idcasa);

            const resultado = await ReservaModel.create({
                idcasa:   id,
                checkin:    checkin,
                checkout:    checkout,
                nome:      nome,
                telefone:  telefone
             });         
            console.log('Inserido!');
            console.log(resultado);
            res.send(`Inserção Reserva -> checkin: ${req.body.checkin}, Checkout: ${req.body.checkout}, Nome: ${req.body.nome}`)
        });    

        app.post("/insertCasa/", async (req, res) => {
            const anfitriao= req.body.anfitriao;
            const estado = req.body.estado;
            const local = req.body.local;
            const cidade = req.body.cidade;
            const quartos = req.body.quartos;
            const camas = req.body.camas;
            const banheiros = req.body.banheiros;
            const hospedes = req.body.hospedes;
            const moradia = req.body.moradia;
    
            const resultado = await CasaModel.create({
                anfitriao: anfitriao,
                estado: estado,
                local: local,
                cidade: cidade,
                quartos: quartos,
                camas: camas,
                banheiros: banheiros,
                hospedes: hospedes,
                moradia: moradia
            });
            console.log('Inserido!');
            console.log(resultado);
            //response.redirect(`/cadastro`);
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

        app.get("/readReserva/", async (req, res)=>{
          const document = ReservaModel.aggregate([{
            $lookup: 
              {
                from: "casa",
                localField: "idcasa",
                foreignField: "_id",
                as: "reservas"
              }
          }]);
          res.send(document);   
          console.log('Get Reservas!');
          console.log(Result);

          /*
          ReservaModel.find({}, (err, result)=>{
            if(err){
              res.send(err);
            }
            res.send(result);
          });          
            console.log('GetTodos!');
            console.log(Result);*/
        });         
             
        app.get("/readAnfitriao/:search", async (req, res)=>{
            const  search = req.params.search;
            CasaModel.find({anfitriao:{'$regex':`${search}`,'$options':'i'}}).exec( (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
            });                   
         console.log('GetTodos Anfitriao com parâmetro!');
         console.log(Result);
        });

        app.get("/readEstado/:search", async (req, res)=>{
            const  search = req.params.search;
            CasaModel.find({estado:{'$regex':`${search}`,'$options':'i'}}).exec( (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
            });                   
         console.log('GetTodos Estados com parâmetro!');
         console.log(Result);
        });

        app.get("/readLocal/:search", async (req, res)=>{
            const  search = req.params.search;
            CasaModel.find({local:{'$regex':`${search}`,'$options':'i'}}).exec( (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
            });                   
         console.log('GetTodos Local!');
         console.log(Result);
        });
        
        app.get("/readCidade/:search", async (req, res)=>{
            const  search = req.params.search;
            CasaModel.find({cidade:{'$regex':`${search}`,'$options':'i'}}).exec( (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
            });                   
         console.log('Get por cidade!');
         console.log(Result);
        });
        
        app.get("/readQuartos/:search", async (req, res)=>{
            const  search = req.params.search;
            CasaModel.find({quartos: parseInt(search)}).exec( (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
            });                   
         console.log('Get por quartos!');
         console.log(Result);
        });
        
        app.get("/readCamas/:search", async (req, res)=>{
            const  search = req.params.search;
            CasaModel.find({camas: parseInt(search)}).exec( (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
            });                   
         console.log('Get por camas!');
         console.log(Result);
        });
        
        app.get("/readBanheiros/:search", async (req, res)=>{
            const  search = req.params.search;
            CasaModel.find({banheiros: parseInt(search)}).exec( (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
            });                   
         console.log('Get por banheiros!');
         console.log(Result);
        });
        
        app.get("/readHospedes/:search", async (req, res)=>{
            const  search = req.params.search;
            CasaModel.find({hospedes: parseInt(search)}).exec( (err, result)=>{
                if(err){
                  res.send(err);
                }
                res.send(result);
            });                   
         console.log('Get por hospedes!');
         console.log(Result);
        });

        app.get("/readCasa/:Id/", async (req, res)=>{
          const  id = req.params.Id;
          CasaModel.findById({_id: new ObjectId(id)}).exec((err, result) => {
              if(err){
                res.send(err);
              }
              res.send(result);
          });                   
       console.log('Get por Casa ID!');
       console.log(Result);
        });

        app.get("/readCasaCount/", async (req,res)=>{
        CasaModel.find().countDocuments().exec((err, result)=> {
           res.send(result);
        });
        console.log(Result);
        })

        app.get("/deleteCasa/:Id/", async (req, res)=>{
        const  id = req.params.Id;
        CasaModel.findOneAndRemove({id: id}).exec((err, result)=> {
          if (err){
              console.log(err)
          }
          else{
              console.log("Deleted Casa ID: ", result);
          }
          });
        });

        app.patch("/updateCasa/:Id/", async (req, res)=>{
          const  id = req.params.Id;
          const anfitriao= req.body.anfitriao;
            const estado = req.body.estado;
            const local = req.body.local;
            const cidade = req.body.cidade;
            const quartos = req.body.quartos;
            const camas = req.body.camas;
            const banheiros = req.body.banheiros;
            const hospedes = req.body.hospedes;
            const moradia = req.body.moradia;

            var myquery = { _id: new ObjectId(id) };
            var newvalues =  { $set: { 
            anfitriao: anfitriao,
            estado: estado,
            local: local,
            cidade: cidade,
            quartos: quartos,
            camas: camas,
            banheiros: banheiros,
            hospedes: hospedes,
            moradia: moradia
    } 
  }; // O que deseja alterar do documento, neste caso a idade que era 19, agora será atualizada para 18    
   CasaModel.updateOne(myquery, newvalues).exec((err, result)=> {
    if (err){
        console.log(err)
    }
    else{
        console.log("update Casa ID: ", result);
    }
    });
    /*
            const resultado = await CasaModel.updateOne(
              { _id: new ObjectId(id) }, // Documento que deseja alterar
              { $set: { 
                anfitriao: anfitriao,
                estado: estado,
                local: local,
                cidade: cidade,
                quartos: quartos,
                camas: camas,
                banheiros: banheiros,
                hospedes: hospedes,
                moradia: moradia
                } 
              } // O que deseja alterar do documento, neste caso a idade que era 19, agora será atualizada para 18    
            )
            console.log("Deleted Reserva ID: ", resultado);
          
      */    
          });
  
        app.get("/deleteReserva/:Id/", async (req, res)=>{
          const  id = req.params.Id;
          ReservaModel.findOneAndRemove({id: id}).exec((err, result)=> {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted Reserva ID: ", result);
            }
            });
          });
      /*
        //CasaModel.deleteOne({ _id : new ObjectId('61688ef26e1a81282ac2a1ef')})
        CasaModel.findOne({ _id : id}).exec((err, result) => {
          if(err){
            res.send(err);
          }
        CasaModel.remove();
          res.send(result);
        });                   
          console.log('Delete Casa ID!');
         // console.log(`result);
        });
      */
        /*

        Person.findOne({_id: req.params.id}, function (error, person){
        console.log("This object will get deleted " + person);
        person.remove();

    });
        ProdutoModel.findById('169c9130052a4d695b28229')
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
        //console.log('Desconectado do mongodb Atlas!');
    }
}

main();
function _id(_id: any, arg1: { $eq: ObjectId; }) {
  throw new Error('Function not implemented.');
}

function NexFunction(request: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: any, NexFunction: any) {
  throw new Error('Function not implemented.');
}

