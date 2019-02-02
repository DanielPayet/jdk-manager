const inquirer = require('inquirer');
const searchJDK = require('./searchJDK');
const { createConf } = require('./conf-file');
const chalk = require('chalk');

const JAVA_FOLDER_DEFAULT_WIN = "C:\\Program Files\\Java";

function warning() {
    console.log(chalk.yellow("Il ne vous reste plus qu'a exectué jdkm --set <alias>."));
    console.log(chalk.yellow("N'oubliez pas d'ajouter '%JAVA_HOME%\\bin' à la variable d'environement PATH"));
}

function init() {
    inquirer
        .prompt([
            {
                name: "JAVA_DIR",
                type: "input",
                message: "Dossier des jdk (Default: " + JAVA_FOLDER_DEFAULT_WIN + ") : "
            }
        ])
        .then(async (answers) => {
            if (!answers.JAVA_DIR || answers.JAVA_DIR.trim() === "") {
                answers.JAVA_DIR = JAVA_FOLDER_DEFAULT_WIN;
            }
            createConf({ javaDir: answers.JAVA_DIR, jdk: await searchJDK(answers.JAVA_DIR) });
            warning();
        });
}

module.exports = init;