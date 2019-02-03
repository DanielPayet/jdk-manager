#!/usr/bin/env node

const { getConfFile, isConfExist, showAliasDispo } = require('./conf-file');
const init = require('./init');
const update = require('./update');
const chalk = require('chalk');
const program = require('commander');
const { setJDK, getCurrentJDK } = require('./exec');

program
    .version('1.0.1')
    .option('-i, --init', 'Create conf file')
    .option('-u, --update', 'Update conf file')
    .option('-c, --current', 'Actual version of jdk')
    .option('-l, --list', 'List of available jdk')
    .option('-s, --set <alias>', 'Set/Update current jdk in JAVA_HOME')
    .parse(process.argv);

if (program.init) {
    if (!isConfExist()) {
        init();
    } else {
        console.log(chalk.red("The configuration file exist. To update it run 'jdkm --update'"));
        process.exit();
    }
} else if (program.update) {
    if (isConfExist()) {
        update(getConfFile());
    } else {
        console.log(chalk.red("The configuration file doesn't exist. To use jdk-manager run 'jdkm --init' once"));
        process.exit();
    }
} else if (program.set) {
    if (isConfExist()) {
        setJDK(program.set);
    } else {
        console.log(chalk.red("Jdk-manager isn't configure. Run 'jdkm --init'"));
        process.exit();
    }
} else if (program.current) {
    getCurrentJDK();
} else if (program.list) {
    showAliasDispo();
}