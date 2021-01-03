const fs = require('fs');

let listadoTareas;

const cargarDB = () => {
    try {
        listadoTareas = require('../db/todo.json');
    } catch (error) {
        listadoTareas = [];
    }
};

const guardarTareas = () => {
    fs.writeFile('db/todo.json', JSON.stringify(listadoTareas), err => {
        if (err) throw new Exception('Ha ocurrido un error al guardar los datos', err);
    });
};

const crearTarea = (descripcion) => {

    cargarDB();
    const nuevaTarea = {
        descripcion,
        completado: false
    };

    const coincidencias = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);

    if (coincidencias != -1) {
        throw new Error(`Ya existe una tarea con la descripcion ${descripcion}`);
    }

    listadoTareas.push(nuevaTarea);
    guardarTareas();

    console.log(nuevaTarea);
};

const listarTareas = (completado = null) => {
    cargarDB();
    if (!completado) return listadoTareas;
    const tareasFiltradas = listadoTareas.filter(tarea => tarea.completado.toString() == completado);
    return tareasFiltradas;
};

const actualizarTarea = (descripcion, completado = true) => {
    cargarDB();
    const coincidencia = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);

    if (coincidencia === -1) throw new Exception(`No existe la tarea con descripcion ${descripcion}`);

    listadoTareas[coincidencia].completado = completado;

    guardarTareas();
    console.log('Se actualizado correctamente el registro');
    return true;
};

const eliminarTarea = (descripcion) => {
    cargarDB();

    const coincidencia = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);

    if (coincidencia === -1) throw new Exception(`No existe la tarea con descripcion ${descripcion}`);

    listadoTareas.splice(coincidencia, 1);
    guardarTareas();

    console.log('Se ha eliminado correctamente el registro');

    return true;
}

module.exports = {
    crearTarea,
    listarTareas,
    actualizarTarea,
    eliminarTarea
};