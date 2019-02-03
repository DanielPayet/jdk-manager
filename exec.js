const sudo = require('sudo-prompt');
const exec = require('child_process').exec;
const { getConfFile } = require("./conf-file");
const chalk = require('chalk');

const sudoOption = {
    name: 'JDK Manager'
};

function getJDKFolder(alias) {
    const jdk = getConfFile().jdk.find((jdk) => jdk.alias === alias)
    if (!jdk) {
        console.log(chalk.red("unknow JDK :'("));
        process.exit();
    }
    return jdk.folder;
}

function getCurrentJDK() {
    exec('java -version', (e, stdout, stderr) => {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log(stderr, stdout);
    });
}

function setJDK(alias) {
    const folder = getJDKFolder(alias);

    sudo.exec('setx JAVA_HOME "' + folder + '" -m', sudoOption, (e, stdout, stderr) => {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log(chalk.green("JDK successfull updated ! :D :D"));
    });
}

module.exports = { setJDK, getCurrentJDK }