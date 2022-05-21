import inquirer from "inquirer";
import {exec} from "child_process";

export const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Debes ingresar un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

export const pausa = async(mensaje) => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `${mensaje.green}. Presione ${ 'enter'.green } para continuar`
        }
    ];
    await inquirer.prompt(question);
}

export const descargaYouTube = (link, opcion)=> {

    return new Promise((resolve, reject) => {

        const child = exec(`yt-dlp -f ${opcion} ${link}`,
            (err, stdout, stderr) => err ? reject(err) : resolve({
                stdout: stdout,
                stderr: stderr
            }));

        if (child.stdout) {
            child.stdout.pipe(process.stdout);
        }

        if (child.stderr) {
            child.stderr.pipe(process.stderr);
        }
    });
}

export const mostrarFormatos = (link)=> {

    return new Promise((resolve, reject) => {

        const child = exec(`yt-dlp -F ${link}`,
            (err, stdout, stderr) => err ? reject(err) : resolve({
                stdout: stdout,
                stderr: stderr
            }));

        if (child.stdout) {
            child.stdout.pipe(process.stdout);
        }

        if (child.stderr) {
            child.stderr.pipe(process.stderr);
        }
    });
}