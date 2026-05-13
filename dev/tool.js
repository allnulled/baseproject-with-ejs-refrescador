/*@doc Este fichero solamente redirecciona el parámetro de la consola al comando */

//@doc Paso 1. Toma el process.argv.splice(2)
const args = [...process.argv].splice(2);

//@doc Paso 2. Coge el primero del array
const command = args[0];

//@doc Paso 3. Llama al comando indicado, en dev/tool/${nombre}
require(`${__dirname}/tool/${command}.js`)(args.splice(1));