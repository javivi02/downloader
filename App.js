import 'colors';
import {inquirerMenu} from "./Menu.js";
import {
    confirmarPregunta,
    descargaYouTube,
    descargaYouTubePorcion,
    leerInput,
    mostrarFormatos,
    pausa,
    pausaMensaje,
    descargaYouTubeMp3Porcion,
    descargaYouTubeMp3, validarEnlace
} from "./Funciones.js";
import {listadoSitios} from "./Scraping.js";

const main = async () => {

    console.clear();
    let opcion = '';

    do {

        opcion = await inquirerMenu();

        switch (opcion) {

            case '1':
                const link = await leerInput('Copia aqui el enlace de YouTube: ');

                const enlaceValido = await mostrarFormatos(link)
                    .catch(() => {
                        console.log('‼️  Enlace no valido'.red.bold)
                    });

                if (enlaceValido === undefined) {
                    await pausa();
                    break;
                }

                const formato = await leerInput('Introduce el ID del formato que quieres descargar ' +
                    '(lo veras en la 1ª columna): ');

                const partirContenido = await confirmarPregunta('Quieres extraer una parte del contenido ¿?');

                if (partirContenido) {

                    const tiempo1 = await leerInput('Introducir tiempo inicio, ejemplo (00:00:10.00): ');
                    const tiempo2 = await leerInput('Introducir tiempo final, ejemplo (00:00:10.00): ');
                    await descargaYouTubePorcion(link, formato, tiempo1, tiempo2)
                        .then(() => pausaMensaje('Descarga realizada !!!'))
                        .catch(() => pausaMensaje('Error en la descarga !!!'));

                } else {
                    await descargaYouTube(link, formato)
                        .then(() => pausaMensaje('Descarga realizada !!!'))
                        .catch(() => pausaMensaje('Error en la descarga !!!'));
                }

                break;

            case '2':
                const link2 = await leerInput('Copia aqui el enlace de YouTube: ');

                const enlaceValido2 = await validarEnlace(link2)
                    .catch(() => {
                        console.log('‼️  Enlace no valido'.red.bold)
                    });

                if (enlaceValido2 === undefined) {
                    await pausa();
                    break;
                }

                const partirContenido2 = await confirmarPregunta('Quieres extraer una parte del audio ¿?');

                if (partirContenido2) {

                    const tiempo1 = await leerInput('Introducir tiempo inicio, ejemplo (00:00:10.00): ');
                    const tiempo2 = await leerInput('Introducir tiempo final, ejemplo (00:00:10.00): ');
                    await descargaYouTubeMp3Porcion(link2, tiempo1, tiempo2)
                        .then(() => pausaMensaje('Descarga realizada !!!'))
                        .catch(() => pausaMensaje('Error en la descarga !!!'));
                } else {
                    await descargaYouTubeMp3(link2)
                        .then(() => pausaMensaje('Descarga realizada !!!'))
                        .catch(() => pausaMensaje('Error en la descarga !!!'));
                }

                break;

            case '3':
                console.log('Los sitios disponibles son: ...'.green.bold);
                await listadoSitios().then(texto => console.log(texto));
                await pausa();
                break;


            case '0':
                await pausaMensaje('Saliendo de la aplicacion.');
                console.clear();
                break;

        }

    } while (opcion !== '0')

}

main().then();

// https://youtu.be/jSQYTt4xg3I