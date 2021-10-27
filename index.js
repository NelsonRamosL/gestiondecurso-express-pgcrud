const express = require('express')
const { guardarCurso, getCursos,editarCurso,eliminarCurso } = require('./bd/coneccion')
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
    });
    


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
    })






/**
 * 1. Crear una ruta POST /curso que reciba un payload desde el cliente con los datos de
un nuevo curso y los ingrese a la tabla cursos.
 */

app.post('/curso', async (req,res) => {
    const  values  = req.body;
    //const cursoJson = JSON.parse(values);
    console.log(values);
    try {
        const result = await guardarCurso(values);
        res.statusCode = 201;
        res.end(JSON.stringify(result));
    } catch (e) {
        console.log("error" + e)
        res.statusCode = 500;
        res.end("ocurrio un error" + e);
    }


    })
    
/**
2. Crear una ruta GET /cursos que consulte y devuelva los registros almacenados en la
tabla cursos.
 */
app.get('/cursos',async (req,res) => {
    try {
        const cursos = await getCursos();
        res.end(JSON.stringify(cursos));
    } catch (e) {
        res.statusCode = 500;
        res.end("ocurrio un error en el servidor" + e);
    }
    })
    

/**
3. Crear una ruta PUT /curso que reciba un payload desde el cliente con los datos de un
curso ya existente y actualice su registro en la tabla cursos.
 */

app.put('/curso',async (req,res) => {
    const  values  = req.body;
    console.log(values);
       try {
        const result = await editarCurso(values);
        res.statusCode = 200;
        res.end(JSON.stringify(result));
    } catch (e) {
        res.statusCode = 500;
        res.end("ocurrio un error" + e);
    }
    })
    
/**
4. Crear una ruta DELETE /cursos que reciba el id de un curso como parámetro de la
ruta y elimine el registro relacionado en la tabla cursos.
 */

// la ruta del frondtend es /curso. para no modificar el index.html se rempaza /cursos por /curso
app.delete('/curso/:id',async (req,res) => {
    console.log("entramos en eliminar")
    const { id } = req.params;
    console.log(id)
    try {
       // let { id } = url.parse(req.url, true).query;
        await eliminarCurso(id);
        res.end("Usuario eliminado");
    } catch (e) {
        res.statusCode = 500;
        res.end("ocurrio un error en el servidor eliminar usuario" + e);
    }
})