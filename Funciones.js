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

export const confirmarPregunta = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'porcion',
            message: 'Quieres partir el video ¿?',
            default: false,
        }
    ];

    const { porcion } = await inquirer.prompt(question);

    console.log({porcion})
    return porcion;

}

export const pausa = async(mensaje) => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];
    await inquirer.prompt(question);
}

export const pausaMensaje = async(mensaje) => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `${mensaje}. Presione ${ 'enter'.green } para continuar`
        }
    ];
    await inquirer.prompt(question);
}

export const descargaYouTube = (link, opcion)=> {

    return new Promise((resolve, reject) => {

        const child = exec(`yt-dlp -f ${opcion} ${link} -o "~/Downloads/%(title)s.%(ext)s"`,
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

export const descargaYouTubePorcion = (link, opcion, tiempo1, tiempo2)=> {

    return new Promise((resolve, reject) => {

        const comando = `yt-dlp 
            -f ${opcion} ${link}
            --external-downloader ffmpeg --external-downloader-args "-ss ${tiempo1} -to ${tiempo2}
            -o "~/Downloads/%(title)s.%(ext)s"`

        const child = exec(comando,
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