module.exports = (APP,Data,ShopingCart, Total) =>{
    
    //Zonas
    APP.get('/zonas', (req,res) => {
    let show = Data.map (e=> e.zona);
    res.json( show ); 
    });

    //restaurantes por zona
    APP.post('/restaurants',(req, res)=> {
    let zona =req.body.zona;
    let show = (Data.filter((o, i, a)=> a[i].zona == zona )[0].restaurants );
    res.json (show);
    });

    //menu del restaurante
    APP.post('/menu',(req,res) => {
    let zona =req.body.zona; //zona
    let id = req.body.id; //id del restaurante
    let show = ((Data.filter((o, i, a)=> a[i].zona == zona )[0].restaurants).filter (e => e.id == id)[0].menu);
    res.json(show);

    })
     //Carrito de compras - seleccionar un producto
    APP.post ('/shop', (req, res) => {
        let zona= req.body.zona; //zona 
        let id =req.body.id; //id del restaurante
        let platillo = req.body.platillo //id del platillo
     
        let carrito = (Data.filter((o, i, a)=> a[i].zona ==zona)[0].restaurants).filter (e => e.id == id)[0].menu;
        carrito = carrito.filter (e => e.id == platillo)
        ShopingCart.push(carrito[0].nombre);
        Total += carrito[0].value;
        console.log (ShopingCart, Total);
        res.send(`Carrito: ${JSON.stringify(ShopingCart)}`);
    })

     //Carrito de compras - deseleccionar un producto
     APP.post ('/return', (req, res) => {
        let zona= req.body.zona; //zona 
        let id =req.body.id; //id del restaurante
        let platillo = req.body.platillo //id del platillo
     
        let carrito = (Data.filter((o, i, a)=> a[i].zona ==zona)[0].restaurants).filter (e => e.id == id)[0].menu;
        carrito = carrito.filter (e => e.id == platillo)
        console.log (carrito)
        Total -= carrito[0].value;
        ShopingCart = ShopingCart.filter ( x => x !== carrito[0].nombre);
        console.log (ShopingCart, Total);
        res.send(`Carrito: ${JSON.stringify(ShopingCart)}`);
    })

    //checkout
    APP.get ('/checkout', (req, res)=>{
    if (ShopingCart.length === 0) res.status(404).json({ error: 'No hay nada en el carrito' });
     res.json(`Carrito:${ShopingCart}, Total: ${Total}`)
    });

    //cancelar pedido por los parametros en la url http://localhost:3000/cancel/0
    APP.get ('/cancel/:accept', (req, res) => {
     let cancel = req.params.accept;
     let message;
     console.log (req.params.accept)
     if (cancel == 1){
         message = " Pedido cancelado"
         ShopingCart=[];
         Total= 0; }else{
         message = "Puede seguir comprando, su pedido no se ha cancelado"
         }
         console.log (ShopingCart, Total);
    res.send(message)
    })

    //cancelar pedidos por query enviando los datos por param en postman o 
    //http://localhost:3000/cancel?accept=0
    APP.get ('/cancel', (req, res) => {
        let cancel = req.query.accept;
        let message;
        console.log (req.query.accept)
        if (cancel == 1){
            message = " Pedido cancelado"
            ShopingCart=[];
            Total= 0; }else{
            message = "Puede seguir comprando, su pedido no se ha cancelado"
            }
            console.log (ShopingCart, Total);
       res.send(message)
       })




}

