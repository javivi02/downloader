import {capturarNombreDescarga, convertirMp3, pausaMensaje} from "./Funciones.js";

/*const nombre = {
    stdout: 'Chanel_-_SloMo_-_LIVE_-_Spain_-_Grand_Final_-_Eurovision_2022.webm\n',
    stderr: ''
}*/

const nombre = await capturarNombreDescarga('https://youtu.be/jSQYTt4xg3I');

await convertirMp3(nombre.stdout)
    .then(() => pausaMensaje('Archivo convertido !!!'))
    .catch(() => pausaMensaje('Error al realizar la conversion !!!'));