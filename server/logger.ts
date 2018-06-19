class Logger {
    error(...args: any[]) {
        console.error('error:', ...args)
    }

    info(...args: any[]) {
        console.log('info:', ...args)
    }
}

const log = new Logger()
export default log


