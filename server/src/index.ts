import app from './app';
import { connect } from 'mongoose';

async function main() {
    try {
        const urlMongoDB = 'mongodb+srv://adminprojeto:senhasenha.123@banco-projeto-airbnb.mw94s.mongodb.net/bancocloneairbnb00?retryWrites=true&w=majority';
        
        //const uri = 'mongodb+srv://adminprojeto:senhasenha.123@banco-projeto-airbnb.mw94s.mongodb.net/bancocloneairbnb00?retryWrites=true&w=majority';
        //process.env.MONGO_URL ||'mongodb://localhost:27017/';
        //const uri = 'mongodb+srv://dbUser:kil,ji8oku@cluster0.wszic.mongodb.net/meubd?retryWrites=true&w=majority';
        //const uri = "mongodb+srv://adminprojeto:senhasenha.123@npmbanco-projeto-airbnb.mw94s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" --username <adminprojeto > senhasenha.123
       // 'mongodb+srv://fabio:2010@cluster0.u9ema.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        await connect(urlMongoDB);
        console.log('Conectado ao MongoDB');
        app.listen(app.get('port'), () => {
            console.log('Express na porta:', app.get('port'));
            console.log('Express no modo:', app.get('env'));
        });
    } catch (error) {
        console.log('Erro ao iniciar o servidor:', error);
    }
}

main();