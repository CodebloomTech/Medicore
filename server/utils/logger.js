const chalk = require("chalk");
const ora = require("ora");

const spinner = ora();

function logBanner() {
  console.log(chalk.green.bold(`
   __  __          _ _
  |  \\/  | ___  __| (_) ___ ___  _ __ ___
  | |\\/| |/ _ \\/ _\` | |/ __/ _ \\| '__/ _ \\
  | |  | |  __/ (_| | | (_| (_) | | |  __/
  |_|  |_|\\___|\\__,_|_|\\___\\___/|_|  \\___|

  `));
}

function startSpinner(message) {
  spinner.start(message);
}

function stopSpinnerSuccess(message) {
  spinner.succeed(message);
}

function stopSpinnerFail(message) {
  spinner.fail(message);
}

function logInfo(message) {
  console.log(chalk.blue("ℹ️  " + message));
}

function logError(title, message) {
  console.error(chalk.red(`❌ ${title}: ${message}`));
}

function logTime(startTime) {
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  console.log(chalk.magenta(`⏱️  Startup completed in ${duration}s`));
}

module.exports = {
  logBanner,
  startSpinner,
  stopSpinnerSuccess,
  stopSpinnerFail,
  logError,
  logInfo,
  logTime,
  spinner,
};
