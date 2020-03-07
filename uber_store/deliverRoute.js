
export default (DELIVER, ShopingCart, store, salesDeliver) =>{
    
    //ver lita de pedidos
    DELIVER.get('/', (req,res) => {
    res.send(ShopingCart)
    });

    //acepta o rechaza el pedido
    DELIVER.post('/accept', (req,res) => {
        const accept = req.query.accept; //rechaza con 0 , acepta con 1
        if (accept == 0 ){
            ShopingCart = [];
            store.total = 0;
            res.send("pedido cancelado");
        }
        else{
        res.send(JSON.stringify(ShopingCart) + store.total); //si acepta le muestro el pedido y el costo a cobrar
        }    
        });

    //termina entrega
    DELIVER.delete('/', (req,res)=>{
        const deliver =req.query.deliver; //manda un 1 cuando termine de repartir 
        if (ShopingCart.length > 0 && deliver == 1 )  //si había pedido y lo entregó
        {   salesDeliver.total += (store.total * .2);//le pago un 20% del total
            ShopingCart =[]; //vacio el carrito
            store.total =0; //vacio la cuenta del cliente
        res.json(salesDeliver.total)} //ve el total ganado hasta el momento
        else{ res.sendStatus(404)}
        });
    
}

