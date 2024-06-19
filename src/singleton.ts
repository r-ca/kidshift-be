import Logger from '@src/logger';

let requestLogger: Logger;

function getRequestLogger(): Logger {
    if (!requestLogger) {
        requestLogger = new Logger();
        requestLogger.setTag('API-LOG');
    }
    return requestLogger;
}

export { getRequestLogger }
