const {Pool} = require('pg')

const config = {
    user: 'postgres',
    host:'localhost',
    password:'postgres',
    port:5432,
    database:'repertorio',
};

const pool = new Pool(config)

const consultaDatos = async()=>{
    try{
        const respuesta = await pool.query('SELECT * FROM canciones')
        return respuesta;
    }catch(e){
        console.log(e)
    }
}

const agregarCancion = async(datos)=>{
    try{
        const consulta = {
            text: ' INSERT INTO canciones (titulo, artista, tono) values ($1,$2,$3)',
            values: datos
        }
        const resultado = await pool.query(consulta)
        return resultado
    }catch(e){
        console.log(e)
    }finally{

    }
}

const editar = async(datos)=>{
    try{
        const consulta = {
            text: 'UPDATE canciones set titulo = $2, artista = $3, tono = $4 where id = $1 returning *',
            values: datos 
        }
        const result = await pool.query(consulta)
        return result
    }catch(e){
        console.log(e);
    }
}

const eliminar = async(datos)=>{
    try{
        const consulta = {
            text: 'DELETE from canciones where id = $1',
            values: datos
        }
        const result = await pool.query(consulta)
        return result
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    consultaDatos,
    agregarCancion,
    editar,
    eliminar
}