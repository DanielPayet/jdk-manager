#!/usr/bin/env node

const { getConfFile, isConfExiste } = require('./conf-file');
const init = require('./init');
const update = require('./update');
const chalk = require('chalk');
const program = require('commander');
const setJDK = require('./exec');

program
    .version('0.0.1')
    .option('-i, --init', 'create conf file')
    .option('-u, --update', 'update conf file')
    .option('-s, --set <alias>', 'Met a jour la version du jdk dans JAVA_HOME')
    .parse(process.argv);

if (program.init) {
    if (!isConfExiste()) {
        init();
    } else {
        console.log(chalk.red("Le fichier de configuration existe déjà. Essayer jdkm --update ou jdkm -u"));
        process.exit();
    }
} else if (program.update) {
    if (isConfExiste()) {
        update(getConfFile());
    } else {
        console.log(chalk.red("Le fichier de configuration n'existe pas. Essayer jdkm --init ou jdkm -i"));
        process.exit();
    }
} else if (program.set) {
    if (program.set === true) {
        console.log(chalk.red("Merci de spécifié une version via son alias"));
        process.exit();
    } else {
        if (isConfExiste()) {
            setJDK(program.set);
        } else {
            console.log(chalk.red("Jdk-manager n'est pas configurer. Lancer jdkm --init ou jdkm -i"));
            process.exit();
        }
    }
}