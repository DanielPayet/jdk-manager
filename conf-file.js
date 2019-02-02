const fs = require('fs');
const chalk = require('chalk');

function erreurFileNoteFound() {
    console.error(chalk.red("Le fichier de configuration n'existe pas. Pour utiliser jdk-manager lancer une première fois le command jdkm init"));
}

function isConfExiste() {
    return fs.existsSync(configPath);
}

function getConfFile() {
    if (fs.existsSync(configPath)) {
        return require(configPath);
    } else {
        erreurFileNoteFound();
    }
}

function createConf(conf, isUpdate) {
    const path = configPath;
    if (!isUpdate && fs.existsSync(path)) {
        console.log("Le fichier de configuration existe déjà. Essayer jdkm --update");
        process.exit();
    } else {
        fs.writeFile(path, JSON.stringify(conf, null, 4), (err) => {
            if (err) {
                console.error(chalk.red(err));
                process.exit();
            } else {
                if (isUpdate) {
                    console.log(chalk.green("Youhou !Jdk-manager a été mis à jour"));
                } else {
                    console.log(chalk.green("Yeah ! Jdk-manager est opérationel!"));
                }
            }
        });
    }
}

const configPath = require('os').homedir() + '\\jdkm.json'

module.exports = { getConfFile, configPath, createConf, isConfExiste };