export default (USER,restaurants, menu ,ShopingCart, store) =>{
    
    //Zonas
    USER.get('/', (req,res) => {
    let show = restaurants.map (e=> e.name);
    res.json( show ); 
    });

    //restaurantes por zona  http://localhost:3000/user/zona?zona=sur 
    USER.get('/zona',(req, res)=> {
    let zona = req.query.zona; //sur, centro, poniente
    let result = (restaurants.find(a=> a.name == zona)) //filtro por nombre de zona
    result ? res.json(result.restaurants) //si encuentra restaurantes en la zona te los muestra
    : res.status(404).send({ error: 'No hay restaurantes en tu zona!' });
    });

    //menu del restaurante    http://localhost:3000/user/menu
    USER.get('/menu',(req,res) => {
    const id =req.body.id; //id de la zona    eb6f95a1-2df4-401a-a568-6a2859474e06
    const name = req.body.name; //nombre del restaurante   Vips
    let show = (menu.filter( a => a.zona_id == id )).find( e => e.name == name).menu  //trae el menu de la zona y restaurante indicado
    res.json(show);
    })

     //Carrito de compras - seleccionar un producto - http://localhost:3000/user/shop
    USER.post ('/shop', (req, res) => {
        const id =req.body.id; //id de la zona     eb6f95a1-2df4-401a-a568-6a2859474e06
        const name = req.body.name; //nombre del restaurante   Vips
        const platillo = req.body.platillo //nombre del platillo   Hamburguesa Vips

        let carrito = (menu.filter( a => a.zona_id == id )).find( e => e.name == name).menu
        carrito = carrito.find (e => e.food == platillo);
        if(ShopingCart.length > 0 ){  //ver si es el primer platillo para ir agregando en caso de que ya exista
        const elemen= ShopingCart.find(e=>e.restaurant === name) //busco el restaurante en el carrito   
            elemen? ShopingCart[0].platillos.push(platillo) //agrego en la lista de platillos el actual 
            : res.send("No puedes seleccionar platillos de diferentes restaurantes")  //si no aparece el restaurante en el carrito mando alerta
        }else{ShopingCart.push({restaurant: name, platillos: [platillo]})
        }
        store.total += carrito.price;  //sumo el platillo al total del usuario
        const message = {ShopingCart, total: store.total}
        //console.log(ShopingCart)
        res.json(message)
    })

     //Carrito de compras - deseleccionar un producto -  http://localhost:3000/user/return
     USER.delete ('/return', (req, res) => {
        const id =req.body.id; //id de la zona  eb6f95a1-2df4-401a-a568-6a2859474e06
        const name = req.body.name; //nombre del restaurante    Vips
        const food = req.body.platillo //nombre del platillo   Hamburguesa Vips
        let carrito = (menu.filter( a => a.zona_id == id )).find( e => e.name == name).menu  
        carrito = carrito.find (e => e.food == food)  //busco el producto en data para obtener precio
        store.total -= carrito.price; //descontar del total
        ShopingCart[0].platillos= ShopingCart[0].platillos.filter( x => x !== food) //quito el platillo del carrito
        const message ={ShopingCart, total: store.total}  
        //console.log(ShopingCart)
        res.json(message)
    })

    //checkout es cuando el cliente da click en comprar   http://localhost:3000/user/checkout
    USER.get ('/checkout', (req, res)=>{
    if (ShopingCart.length > 0) //si hay algo en el carrito
    {res.redirect('/restaurant')} //envia a el restaurante el pedido
    else 
    {res.status(404).json({ error: 'No hay nada en el carrito'})} 
    });

    //cancelar pedido    http://localhost:3000/cancel/0
    USER.post ('/cancel/:accept', (req, res) => {
     let cancel = req.params.accept;  // 0 para no cancelar y continuar comprando, 1 para cancelar pedido
     let message;
     if (cancel == 1){
         message = " Pedido cancelado"
         ShopingCart=[];
         store.total= 0; }else{
         message = "Puede seguir comprando, su pedido no se ha cancelado"
         }
        res.status(200).json({mensaje: message})
    })

    

   


}

