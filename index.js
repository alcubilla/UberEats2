
import express from 'express';
import http from 'http';
import menu from './Data/menu'
import restaurants from './Data/restaurants'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './uber_store/userRoute'  //api usuario
import restaurantRoute from './uber_store/restaurantRoute' //api restaurant
import deliverRoute from './uber_store/deliverRoute' //api repartidor

dotenv.config();

const APP= express();
const USER = express();
const RESTAURANT =express();
const DELIVER = express();

const SERVER = http.createServer(APP);

APP.use(bodyParser.urlencoded({extended: true}));
APP.use(bodyParser.json());

APP.use(express.json());

APP.use('/user', USER);
APP.use('/restaurant', RESTAURANT);
APP.use('/deliver' ,DELIVER);

let ShopingCart =[]; //carrito usuario
const store= {total : 0 };  //costo pedido, a pagar por el usuario
const salesRestaurant ={ total : 0}; //monedero restaurant
const salesDeliver ={ total : 0}; //monedero repartidor

userRoute(USER, restaurants, menu, ShopingCart, store);
restaurantRoute(RESTAURANT, ShopingCart, store,salesRestaurant, menu);
deliverRoute(DELIVER, ShopingCart, store, salesDeliver);


SERVER.listen (process.env.PORT || 3000);



