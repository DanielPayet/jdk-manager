const inquirer = require('inquirer');
const searchJDK = require('./searchJDK');
const { createConf } = require('./conf-file');
const chalk = require('chalk');
const path = require('path');

const DEFAULT_JAVA_WIN = "C:" + path.sep + "Program Files" + path.sep + "Java";

function warning() {
    console.log(chalk.yellow("Now you can run jdkm --set <alias> to update jdk version."));
    console.log(chalk.yellow("Don't forget to add '%JAVA_HOME%" + path.sep + "bin' to the PATH"));
}

function init() {
    inquirer
        .prompt([
            {
                name: "JAVA_DIR",
                type: "input",
                message: "Jdk's directory (Default: " + DEFAULT_JAVA_WIN + ") : "
            }
        ])
        .then(async (answers) => {
            if (!answers.JAVA_DIR || answers.JAVA_DIR.trim() === "") {
                answers.JAVA_DIR = JAVA_WIN;
            }
            createConf({ javaDir: answers.JAVA_DIR, jdk: await searchJDK(answers.JAVA_DIR) });
            warning();
        });
}

module.exports = init;