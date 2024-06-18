import chalk from 'chalk';

class Logger {

    private tags: string[] = [];

    constructor() {
        this.tags.push('default');
    }

    setTags(tags: string[]) {
        this.tags = tags;
    }

    setTag(tag: string) {
        this.tags = [tag];
    }

    getChild(tag: string) {
        const child = new Logger();
        child.setTags([...this.tags, tag]);
        return child;
    }

    private tagString() {
        return this.tags.join('/');
    }

    info = (message: string) => {
        console.log(chalk.blue('[INFO ]') + ' ' + this.tagString() + ':\t' + message);
    }

    warn = (message: string) => {
        console.log(chalk.yellow('[WARN ]') + ' ' + this.tagString() + ':\t' + message);
    }

    error = (message: string) => {
        console.log(chalk.red('[ERROR]') + ' ' + this.tagString() + ':\t' + message);
    }

    debug = (message: string) => {
        console.log(chalk.gray('[DEBUG]' + ' ' + this.tagString() + ':\t' + message));
    }

    success = (message: string) => {
        console.log(chalk.green('[SUCCESS]') + ' ' + this.tagString() + ':\t' + message);
    }
}

export default Logger;
