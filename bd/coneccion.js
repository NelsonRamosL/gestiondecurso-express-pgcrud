const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "cursos",
    port: 5432
});



const guardarCurso = async (curso) => {
    const values = Object.values(curso);
    console.log(values);
    const consulta = {
        text: "INSERT INTO cursos (nombre, nivel, fecha,duracion) values ($1,$2,$3,$4)",
        values
    };
    const result = await pool.query(consulta);
    return result;
}





const getCursos = async () => {
    const result = await pool.query("SELECT id,nombre,nivel,to_char(fecha,'YYYY-MM-DD') as fecha,duracion FROM cursos");
    console.log(result)
    return result.rows;
}








const editarCurso = async (curso) => {
    const values = Object.values(curso);
 console.log(values);
    const consulta = {
        text: "UPDATE cursos SET nombre=$1, nivel=$2, fecha=$3,duracion=$4 WHERE id=$5 RETURNING *",
        values
    };
    const result = await pool.query(consulta);
    return result;
}




const eliminarCurso = async (id) => {
    const result = await pool.query(`DELETE FROM cursos WHERE id = ${id}`);
    return result.rows;
}



module.exports = { guardarCurso, getCursos, editarCurso, eliminarCurso }
