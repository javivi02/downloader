import 'colors';
import {inquirerMenu} from "./Menu.js";
import {descargaYouTube, leerInput, mostrarFormatos, pausa} from "./Funciones.js";

const main = async () => {

    console.clear();
    let opcion = '';

    do {

        opcion = await inquirerMenu();

        switch (opcion) {
            case '1':
                const link = await leerInput('Enlace de YouTube: ');

                await mostrarFormatos(link);

                const formato = await leerInput('Introduce el numero del formato que quieres descargar: ');

                await descargaYouTube(link, formato)
                    .then(() => pausa('Descarga realizada !!!'))
                    .catch(() => pausa('Error en la descarga !!!'));

                break;

            case '2':
                console.log('opcion 2')
                break;

            case '0':
                console.log('Saliendo de la aplicacion');
                break;

        }

        //await pausa();

    }while (opcion !== '0')

}

main().then();