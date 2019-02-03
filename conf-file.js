const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

function erreurFileNoteFound() {
    console.error(chalk.red("The configuration file doesn't exist. To use jdk-manager run 'jdkm --init' once"));
}

function isConfExist() {
    return fs.existsSync(configPath);
}

function getConfFile() {
    if (fs.existsSync(configPath)) {
        return require(configPath);
    } else {
        erreurFileNoteFound();
    }
}

function showAliasDispo() {
    console.log("Available JDK:");
    getConfFile().jdk.forEach(java => {
        console.log(`    - ${java.version} (alias: ${chalk.cyan(java.alias)})`);
    });
}

function createConf(conf, isUpdate) {
    const path = configPath;
    if (!isUpdate && fs.existsSync(path)) {
        console.log("The configuration file already exist. Run 'jdkm --update' instead.");
        process.exit();
    } else {
        fs.writeFile(path, JSON.stringify(conf, null, 4), (err) => {
            if (err) {
                console.error(chalk.red(err));
                process.exit();
            } else {
                if (isUpdate) {
                    console.log(chalk.green("Youhou !Jdk-manager has been updated !"));
                } else {
                    console.log(chalk.green("Yeah ! Jdk-manager is ready !"));
                }
            }
        });
    }
}

const configPath = require('os').homedir() + path.sep + 'jdkm.json'

module.exports = { getConfFile, configPath, createConf, isConfExist, showAliasDispo };