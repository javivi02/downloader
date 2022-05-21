import 'colors';
import {inquirerMenu} from "./Menu.js";
import {
    confirmarPregunta,
    descargaYouTube,
    descargaYouTubePorcion,
    leerInput,
    mostrarFormatos,
    pausa,
    pausaMensaje
} from "./Funciones.js";

const main = async () => {

    console.clear();
    let opcion = '';

    do {

        opcion = await inquirerMenu();

        switch (opcion) {

            case '1':
                const link = await leerInput('Enlace de YouTube: ');

                const enlaceValido = await mostrarFormatos(link)
                    .catch(()=>{
                        console.log('‼️  Enlace no valido'.red.bold)
                    });

                if (enlaceValido === undefined) {
                    await pausa();
                    break;
                }

                const formato = await leerInput('Introduce el numero del formato que quieres descargar: ');

                const partirContenido = await confirmarPregunta();

                if (partirContenido){
                    const tiempo1 = await leerInput('Introducir tiempo inicio, ejemplo (00:00:10.00): ');
                    const tiempo2 = await leerInput('Introducir tiempo inicio, ejemplo (00:00:10.00): ');
                    await descargaYouTubePorcion(link, formato, tiempo1, tiempo2)
                        .then(() => pausaMensaje('Descarga realizada !!!'))
                        .catch(() => pausaMensaje('Error en la descarga !!!'));

                }else{
                    await descargaYouTube(link, formato)
                        .then(() => pausaMensaje('Descarga realizada !!!'))
                        .catch(() => pausaMensaje('Error en la descarga !!!'));
                }
                break;

            case '2':
                const answer = await confirmarPregunta();
                console.log({answer})
                await pausa();
                break;

            case '0':
                await pausaMensaje('Saliendo de la aplicacion.');
                break;

        }

        //await pausa();

    }while (opcion !== '0')

}

main().then();

// https://youtu.be/jSQYTt4xg3I