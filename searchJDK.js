const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

/**
 * 
 * @param {string} file 
 */
function isJDKFolder(file) {
    return file.includes("jdk");
}

/**
 * 
 * @param {string} workingDir 
 * @returns { string }
 */
function getJDKFolders(workingDir) {
    return fs.readdirSync(workingDir).filter((file) => {
        const name = path.join(workingDir, file);
        const isJdk = isJDKFolder(file);
        const isDirectory = fs.statSync(name).isDirectory();
        return isJdk && isDirectory;
    });
}

/**
 * 
 * @param {string} jdkFolder 
 * @returns {string}
 */
function getVersion(jdkFolder) {
    const versionRegex = /^jdk(?:-)?([0-9._]+)$/;
    return versionRegex.exec(jdkFolder)[1];
}

function getPromptOption(versions) {
    return versions.map((version, i) => {
        return {
            name: "alias_" + i,
            type: "input",
            message: "Alias pour le jdk '" + version + "' : "
        }
    });
}

function isAliasUnique(arr) {
    arr.reduce((a, b) => {
        if (a.indexOf(b) >= 0) {
            console.log(chalk.red("Aliases must be unique."));
            process.exit();
        }
        return a.concat(b);
    }, []);
}

/**
 * @param {string[]} versions 
 * @returns {Promise<string>}
 */
function getAlias(versions) {
    return new Promise(res => {
        inquirer
            .prompt(getPromptOption(versions))
            .then(answers => {
                const values = Object.values(answers);
                isAliasUnique(values);
                res(values.map((alias, i) => {
                    if (!alias || alias.trim() === "") {
                        return versions[i];
                    } else {
                        return alias;
                    }
                }))
            });
    });
}

/**
 * 
 * @param {string} workingDir 
 * @param {string} name 
 */
function buildConfig(workingDir, name, version, alias) {
    return ({
        folder: workingDir + path.sep + name,
        version: version,
        alias: alias
    });
}

/**
 * 
 * @param {string} workingDir 
 * @returns {string[]}
 */
async function searchJDK(workingDir) {
    const jdkFolders = getJDKFolders(workingDir);
    console.log(chalk.green(`${jdkFolders.length} jdk trouvés.`));
    console.log(chalk.cyan("Configuration des alias des jdk"));
    console.log(chalk.cyan("Par défaut la version du jdk sera utilisé."));
    const versions = jdkFolders.map(folder => getVersion(folder));
    const alias = await getAlias(versions);
    return jdkFolders.map((file, i) => buildConfig(workingDir, file, versions[i], alias[i]));
}

module.exports = searchJDK;