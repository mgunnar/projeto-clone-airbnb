import express from "express";
//usando express
//import { router as casaRouter } from './routes/casa.routes';
//npm install
//npm add express morgan nodeman ejs body-parser dotenv mongoose express-validator cors errorhandler passport jsonwebtoken passport-local passport-jwt
//npm i @types/express --save-dev
//npm i node-fetch@cjs
//npm i @types/node-fetch@2.5.12 --save-dev
//npm i ts-node --save-dev
//npm i @types/node -D
//npm i supertest
//npm i jest
//npm i express-validator

const app = express();
app.set('port', process.env.PORT || 3000);
//app.use('/', casaRouter);

export default app;
