const { argv } = require('./config/yargs');
const colors = require('colors');
const { crearTarea, listarTareas, actualizarTarea, eliminarTarea } = require('./todo/todo');

const opcion = argv._[0];

switch (opcion) {
    case 'crear':
        crearTarea(argv['descripcion']);
        break;

    case 'actualizar':
        actualizarTarea(argv['descripcion'], argv['completado']);
        break;

    case 'listar':
        const completado = argv['completado'];
        const tareas = listarTareas(completado);

        if (!tareas.length) return console.log(`No se encontraron registros con el estado ${completado}`)
        for (let tarea of tareas) {
            console.log('========================Listado De Tareas========================'.green);
            console.log(`Tarea: ${tarea.descripcion}`);
            console.log(`Completado: ${tarea.completado}`);
            console.log('================================================================='.green);
        }
        break;

    case 'eliminar':
        eliminarTarea(argv['descripcion']);
        break;

    default:
        console.log('Comando no es reconocido');
        break;
}