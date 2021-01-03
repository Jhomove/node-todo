const descripcion = {
    demand: true,
    alias: 'd'
};

const completado = {
    alias: 'c',
    default: true
};

const { argv } = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualizar el estado completo de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Listar tareas', {
        completado: {
            ...completado,
            default: null
        }
    })
    .command('eliminar', 'Eliminar tarea', {
        descripcion
    })
    .help();

module.exports = {
    argv
};