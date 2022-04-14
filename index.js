const express = require('express')
const app = express()

const {consultaDatos, agregarCancion, editar, eliminar} = require('./db/consultas')

const port = 3000



app.listen(port, ()=>{
    console.log('Servidor andando en puerto '+port);
})

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.get('/canciones', async (req,res)=>{
    try{
        const data = await consultaDatos();
        res.json(data.rows);
    }catch(e){
        console.log(e);
    }
})
app.use(express.json())
app.post('/cancion', async(req,res)=>{
    try{
        const cancion = Object.values(req.body);
        const respuesta = await agregarCancion(cancion);
        res.json(respuesta);
    }catch(e){
        console.log(e);
    }
});
app.put('/cancion/:id', async (req,res)=>{
    const datos = Object.values(req.body);
    datos.unshift(req.params.id);
    const respuesta = await editar(datos);
    res.json(respuesta);
});

app.delete('/cancion',async(req,res)=>{
    const datos = Object.values(req.query);
    const respuesta = await eliminar(datos);
    res.json(respuesta)
})