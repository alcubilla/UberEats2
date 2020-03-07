export default (RESTAURANT, ShopingCart, store,salesRestaurant,menu) => {


    //ver todos los pedidos de todos los restaurantes
    RESTAURANT.get('/', (req,res) =>{
        let message = {ShopingCart, Total: store.total}
        res.json(message)
    })

    // Ver pedidos por restaurant por aceptar
    //http://localhost:3000/restaurant/?name=Tacos Lara
    RESTAURANT.post('/', (req,res)=>{
    const name =req.query.name;
    const accept = req.body.accept; //si lo acepta manda un 1, cancelar 0
    if (accept == 0) //si no lo acepta vacio el pedido y se cancela
    {   ShopingCart =[];
        store.total = 0;
        res.send("Se cancelo el pedido")
    }
    else{
        const result= [ShopingCart.find(a => a.restaurant == name), store.total] //busco los pedidos de este restaurante
        if(store.total >0) res.json (result); //si hay algo muestro el pedido
        else res.send("no hay pedidos") // si no le digo que no hay pedidos para el aún
    }});

    //termina pedido
    RESTAURANT.delete('/', (req,res)=>{
        const finish =req.query.finish; // 1 cuando lo termina
        if (ShopingCart.length > 0 && finish == 1 )    //si habia pedido y lo terminó
        {   salesRestaurant.total += (store.total * .8); //le asigno su pago
            console.log(salesRestaurant.total) 
            res.redirect('/deliver')} //se lo envio al repartidor
        else{ res.sendStatus(404)}
        });

    //ventas del restaurante
    RESTAURANT.get('/sales', (req, res)=>{
        res.json(salesRestaurant.total)
    });

    //agregar un platillo nuevo  http://localhost:3000/restaurant/add
    RESTAURANT.put('/add', (req, res)=>{  
        let name=req.body.name; //nombre del restaurant
        let food= req.body.platillo; //nuevo platillo
        let price= req.body.price; //precio del nuevo platillo
        let nuevo =menu.find(x=> x.name == name).menu
        nuevo.push({food: food, price: price})
        res.json(nuevo) //se puede checar tambien en http://localhost:3000/user/menu 
    })

    //borrar platillos del menu 
    RESTAURANT.delete('/remove', (req, res)=>{
        let name=req.body.name; //nombre del restaurant
        let food= req.body.platillo; //nombre del platillo
        const old =menu.find(x=> x.name == name)//busca el menu del restaurante
        var i = menu.indexOf(old); //busca la posicion de este en el array
        let nuevo = old.menu.filter(x=> x.food !== food)  //filtra el menu para quitarle el platillo a eliminar
        menu[i].menu = nuevo  //guardo con los cambios
        res.json(nuevo) //tambien se puede revisar el cambio en  http://localhost:3000/user/menu
    }) 
    
}