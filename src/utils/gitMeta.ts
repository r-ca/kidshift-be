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

export { getCommitHash };
