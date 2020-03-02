

const Data = [
{ zona :"sur",
    restaurants: [
        {   id: 1,
            name: "Las alitas",
            menu:[{id:1, nombre :"Tacos", value : 50},{id:2, nombre :"Hamburguesas", value : 100} ]
        } ,       
        {   id:2,
            name: "Carl Jr",
            menu:[{id:1, nombre :"Papas fritas", value : 80},{id:2,nombre :"Wester Bacos", value : 150} ]
        } 
            
    ]
       
},
{ zona :"norte",
    restaurants: [
        {   id:1,
            name: "Super Salads",
            menu:[{id: 1, nombre :"Ensalada", value : 150},{id:2, nombre :"Panini", value : 120} ]
        } ,       
        {   id:2,
            name: "Tacos la Cima",
            menu:[{id: 1, nombre :"Orden de tacos", value : 90},{id:2, nombre :" Salsa", value : 30} ]
        } 
            
    ]
       
}
]
 
export default Data;
