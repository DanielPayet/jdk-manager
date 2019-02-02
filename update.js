const searchJDK = require("./searchJDK");
const { createConf } = require("./conf-file");
const chalk = require('chalk');

function warning() {
    console.log(chalk.yellow("Il ne vous reste plus qu'a exectué jdkm --set <alias>."));
    console.log(chalk.yellow("N'oubliez pas d'ajouter '%JAVA_HOME%\\bin' à la variable d'environement PATH"));
}

async function update(conf) {
    conf.jdk = await searchJDK(conf.javaDir);
    createConf(conf, true);
    warning();
}

module.exports = update;