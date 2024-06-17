import { exec } from 'child_process';

function getCommitHash() {
  return new Promise((resolve) => {
    exec('git rev-parse --short HEAD', (err, stdout) => {
      if (err) {
        resolve('Something went wrong');
      }
      resolve(stdout.trim());
    });
  });
}

function getCommitMessage() {
    return new Promise((resolve) => {
        exec('git log -1 --pretty=%B', (err, stdout) => {
            if (err) {
            resolve('Something went wrong');
            }
            resolve(stdout.trim());
        });
    });
}

function getCommitDate() {
    return new Promise((resolve) => {
        exec('git log -1 --pretty=%cd', (err, stdout) => {
            if (err) {
            resolve('Something went wrong');
            }
            resolve(stdout.trim());
        });
    });
}

function getBranchName() {
    return new Promise((resolve) => {
        exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
            if (err) {
            resolve('Something went wrong');
            }
            resolve(stdout.trim());
        });
    });
}

export { getCommitHash, getCommitMessage, getCommitDate, getBranchName }
