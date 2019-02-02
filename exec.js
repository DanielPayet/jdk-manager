const exec = require('child_process').exec;
const { getConfFile } = require("./conf-file");
const chalk = require('chalk');

function getJDKFolder(alias) {
    return getConfFile().jdk.find((jdk) => jdk.alias === alias).folder;
}

function setJDK(alias) {
    const folder = getJDKFolder(alias);

    exec('setx JAVA_HOME "' + folder + '"', (e, stdout, stderr) => {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log(chalk.green("Le jdk a été modifié :D"));
    });
}

module.exports = setJDK;