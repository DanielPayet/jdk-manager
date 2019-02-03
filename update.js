const searchJDK = require("./searchJDK");
const { createConf } = require("./conf-file");
const chalk = require('chalk');
const path = require('path');

function warning() {
    console.log(chalk.yellow("Now you can run jdkm --set <alias> to update jdk version."));
    console.log(chalk.yellow("Don't forget to add '%JAVA_HOME% " + path.sep + "bin' to the PATH"));
}

async function update(conf) {
    conf.jdk = await searchJDK(conf.javaDir);
    createConf(conf, true);
    warning();
}

module.exports = update;