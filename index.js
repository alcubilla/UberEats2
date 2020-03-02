
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import Data from './Data/Data'

dotenv.config();

const APP= express();
const SERVER = http.createServer(APP);

let ShopingCart =[];
let Total =0;

APP.use (bodyParser.urlencoded());
APP.use (bodyParser.json());

routes (APP,Data,ShopingCart, Total);

SERVER.listen (process.env.PORT, ()=> console.log('Server started'));



