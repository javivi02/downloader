import 'colors';
import inquirer from "inquirer";

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Descargar contenido de YouTube seleccionando calidad y tipo de archivo`
            },
            {
                value: '2',
                name: `${'2.'.green} Descargar contenido en mp3`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },

        ]
    }
];


export const inquirerMenu = async () => {

    console.clear();
    console.log('=================================='.green);
    console.log('  Estherin Seleccione una opción'.white);
    console.log('==================================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

